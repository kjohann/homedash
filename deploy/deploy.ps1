param(
  [switch]$whatIf
)

$ResourceGroupLocation = "westeurope"
$ResourceGroupName = "HomedashRG"
$TemplateFilePath = ".\HomedashRG\azuredeploy.json"
$ZipContainerName = "deploymentzips"

Import-Module ./sharedFunctions.psm1 -Force

$version = Get-Version
$zipName = "$version.zip"
$zipLocalPath = "./artifacts/$zipName"

$storageAccount = Get-AzureRmStorageAccount -ResourceGroupName $ResourceGroupName
$container = Get-AzureStorageContainer -Name $ZipContainerName -Context $storageAccount.Context -ErrorAction SilentlyContinue
if ($null -eq $container) {
  $container = New-AzureStorageContainer -Name $ZipContainerName -Context $storageAccount.Context
}

$blob = Set-AzureStorageBlobContent -Container $container.Name -Blob $zipName -File $zipLocalPath -Context $storageAccount.Context
$blobUri = $blob.ICloudBlob.Uri.AbsoluteUri

$now = Get-Date
$sasToken = New-AzureStorageBlobSASToken -Container $container.Name -Blob $blob.Name -Permission 'r' -StartTime $now -ExpiryTime $now.AddYears(2)


$zipUrl = "$blobUri?$sasToken"

$TemplateParametersObject = @{zipUrl = $zipUrl}

if ($whatIf.IsPresent) {
  New-ResourceGroupValidation `
  -ResourceGroupLocation $ResourceGroupLocation `
  -ResourceGroupName $ResourceGroupName `
  -TemplateFile $TemplateFilePath `
  -TemplateParametersObject $TemplateParametersObject
} else {
  New-ResourceGroupDeployment `
  -ResourceGroupLocation $ResourceGroupLocation `
  -ResourceGroupName $ResourceGroupName `
  -TemplateFile $templateFilePath `
  -TemplateParametersObject $TemplateParametersObject
}