if (!(Get-Module -ListAvailable -Name InvokeBuild)) {
  Write-Warning "Installing InvokeBuild module..."
  Install-Module InvokeBuild -Force
}

Import-Module InvokeBuild

Invoke-Build
