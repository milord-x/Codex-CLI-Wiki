param(
    [Parameter(Position = 0)]
    [string]$Topic,

    [Parameter(Position = 1)]
    [string]$Option
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$BuildScript = Join-Path $Root "tools/build_site.py"
$IndexFile = Join-Path $Root "site/index.html"

if (-not $Topic) {
    Write-Error "Usage: .\bin\wiki.ps1 codex [--build-only|--print-path]"
}

if ($Topic -ne "codex") {
    Write-Error "Unknown wiki topic: $Topic"
}

if (Get-Command py -ErrorAction SilentlyContinue) {
    & py $BuildScript
} else {
    & python $BuildScript
}

switch ($Option) {
    "--build-only" {
        Write-Output "Built: $IndexFile"
        exit 0
    }
    "--print-path" {
        Write-Output $IndexFile
        exit 0
    }
    "" {
    }
    $null {
    }
    default {
        Write-Error "Unknown option: $Option"
    }
}

Start-Process $IndexFile | Out-Null
Write-Output "Codex CLI wiki: $IndexFile"
