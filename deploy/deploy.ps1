param(
  [switch]$whatIf
)

$ResourceGroupLocation = "westeurope"
$ResourceGroupName = "HomedashRG"
$TemplateFilePath = ".\HomedashRG\azuredeploy.json"
$ZipContainerName = "deploymentzips"

Import-Module ./sharedFunctions.psm1 -Force

$zipName = (Get-ChildItem .\artifacts | Where-Object { $_.Name -like '*.zip' }).Name
$version = $zipName.Substring(0, $zipName.Length + 1 - $zipName.IndexOf('.zip'))
$zipLocalPath = "./artifacts/$zipName"

$storageAccount = Get-AzureRmStorageAccount -ResourceGroupName $ResourceGroupName
$container = Get-AzureStorageContainer -Name $ZipContainerName -Context $storageAccount.Context -ErrorAction SilentlyContinue
if ($null -eq $container) {
  $container = New-AzureStorageContainer -Name $ZipContainerName -Context $storageAccount.Context
}

$blob = Set-AzureStorageBlobContent -Container $container.Name -Blob $zipName -File $zipLocalPath -Context $storageAccount.Context
$blobUri = $blob.ICloudBlob.Uri.AbsoluteUri

$now = Get-Date
$sasToken = New-AzureStorageBlobSASToken -Context $storageAccount.Context -Container $container.Name -Blob $blob.Name -Permission 'r' -StartTime $now.AddDays(-1) -ExpiryTime $now.AddYears(2)

$zipUrl = "$($blobUri)$sasToken"

$TemplateParametersObject = @{zipUrl = $zipUrl; gitVersion = $version;}

if ($whatIf.IsPresent) {
  New-ResourceGroupValidation `
  -ResourceGroupLocation $ResourceGroupLocation `
  -ResourceGroupName $ResourceGroupName `
  -TemplateFile $TemplateFilePath `
  -TemplateParametersObject $TemplateParametersObject
} else {
  "Preparing deploy of $ResourceGroupName..."
  Start-Sleep 5

  New-ResourceGroupDeployment `
  -ResourceGroupLocation $ResourceGroupLocation `
  -ResourceGroupName $ResourceGroupName `
  -TemplateFile $templateFilePath `
  -TemplateParametersObject $TemplateParametersObject
}