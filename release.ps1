if (!(Get-Module -ListAvailable -Name InvokeBuild)) {
  Write-Warning "Installing InvokeBuild module..."
  Install-Module InvokeBuild -Force
}

Import-Module InvokeBuild

Invoke-Build -File .\build\homedash.build.ps1

if ($LASTEXITCODE -eq 0) {
  .\deploy\deploy.ps1
} else {
  Write-Error "Build failed with exit code $LASTEXITCODE"
  exit 1
}