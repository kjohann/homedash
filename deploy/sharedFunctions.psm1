function Format-ValidationOutput {
  param ($ValidationOutput, [int] $Depth = 0)
  Set-StrictMode -Off
  return @($ValidationOutput | Where-Object { $_ -ne $null } | ForEach-Object { @('  ' * $Depth + ': ' + $_.Message) + @(Format-ValidationOutput @($_.Details) ($Depth + 1)) })
}

function New-ResourceGroupValidation {
  param(
    [Parameter(Mandatory=$true)]
    [ValidateNotNullOrEmpty()]    
    [string] $ResourceGroupLocation,
    [Parameter(Mandatory=$true)]
    [ValidateNotNullOrEmpty()]    
    [string] $ResourceGroupName,
    [Parameter(Mandatory=$true)]
    [ValidateNotNullOrEmpty()]    
    [string] $TemplateFile,
    [Parameter(Mandatory=$true)]
    [hashtable] $TemplateParametersObject
  )
  $ErrorMessages = Format-ValidationOutput (Test-AzureRmResourceGroupDeployment -ResourceGroupName $ResourceGroupName `
                                                                                -TemplateFile $TemplateFile `
                                                                                -TemplateParameterObject $TemplateParametersObject)
  if ($ErrorMessages) {
    Write-Output '', 'Validation returned the following errors:', @($ErrorMessages), '', 'Template is invalid.'
  }
  else {
    Write-Output '', 'Template is valid.'
  }
}

function New-ResourceGroupDeployment {
  param(
    [Parameter(Mandatory=$true)]
    [ValidateNotNullOrEmpty()]    
    [string] $ResourceGroupLocation,
    [Parameter(Mandatory=$true)]
    [ValidateNotNullOrEmpty()]    
    [string] $ResourceGroupName,
    [Parameter(Mandatory=$true)]
    [ValidateNotNullOrEmpty()]    
    [string] $TemplateFile,
    [Parameter(Mandatory=$true)]
    [ValidateNotNullOrEmpty()]    
    [hashtable] $TemplateParametersObject
  )
  
  try {
    [Microsoft.Azure.Common.Authentication.AzureSession]::ClientFactory.AddUserAgent("VSAzureTools-$UI$($host.name)".replace(' ','_'), '3.0.0')
  } catch { }
  
  $TemplateFile = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($PSScriptRoot, $TemplateFile))
  Write-Host "TempleteFilePath: $TemplateFile"
  New-AzureRmResourceGroup -Name $ResourceGroupName -Location $ResourceGroupLocation -Verbose -Force
  
  New-AzureRmResourceGroupDeployment `
    -Name ((Get-ChildItem $TemplateFile).BaseName + '-' + ((Get-Date).ToUniversalTime()).ToString('MMdd-HHmm')) `
    -ResourceGroupName $ResourceGroupName `
    -TemplateFile $TemplateFile `
    -TemplateParameterObject $TemplateParametersObject  `
    -Force -Verbose `
    -ErrorVariable ErrorMessages

  if ($ErrorMessages) {
    Write-Output '', 'Template deployment returned the following errors:', @(@($ErrorMessages) | ForEach-Object { $_.Exception.Message.TrimEnd("`r`n") })
    exit 1
  }
}