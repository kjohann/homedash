function Get-AbsolutePath {
  param([string]$relativePath)
  return (Join-Path $BuildRoot $relativePath)
}

function EnsureLocation {
  param([string]$location)
  Set-Location (Get-AbsolutePath $location)
}

function Get-Version {
  param ([switch]$hasBuilt)
  if ($hasBuilt.IsPresent) {
    $tags = git tag -l --points-at HEAD~1
  }
  $tags = git tag -l --points-at HEAD
  if ($tags.GetType() -eq ("string".GetType())) {
    return $tags
  }
  return $tags | Select-Object -Last 1
}

task Clean {
  Remove-Item (Get-AbsolutePath "artifacts") -Force -Recurse -ErrorAction SilentlyContinue
  EnsureLocation "../src/Homedash.web"
  exec { dotnet clean -c Release }
}

task NpmInstall -If (!(Test-Path (Get-AbsolutePath "../src/Homedash.web/client/node_modules"))) {
  EnsureLocation "../src/Homedash.web/client"
  exec { npm ci }
}

task BuildFrontEnd {
  EnsureLocation "../src/Homedash.web/client"
  exec { npm run prod }
}

task FrontEnd NpmInstall, BuildFrontEnd

task Restore {
  EnsureLocation "../"
  exec { dotnet restore }
}

task Build {
  EnsureLocation "../"
  exec { dotnet build -c Release --no-restore }
}

task Publish {
  EnsureLocation "../src/Homedash.web"
  exec { dotnet publish --no-restore --no-build -c Release -o (Get-AbsolutePath "artifacts/publish") }
}

task Zip {
  EnsureLocation "artifacts"
  $zipName = Get-Version
  exec { Compress-Archive -Path "publish/*" -DestinationPath (Get-AbsolutePath "artifacts/$zipName.zip")}
}

task BackEnd Restore, Build, Publish, Zip

task BuildAll Clean, FrontEnd, BackEnd

task . BuildAll