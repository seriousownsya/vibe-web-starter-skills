param(
  [Parameter(Mandatory = $true)]
  [string]$Package,

  [int]$MinAgeDays = 7,

  [switch]$Json
)

$ErrorActionPreference = 'Stop'

$raw = npm view $Package version time dist-tags repository.url license --json
if ($LASTEXITCODE -ne 0) {
  throw "npm view failed for $Package"
}

$meta = $raw | ConvertFrom-Json
$cutoff = (Get-Date).ToUniversalTime().AddDays(-1 * $MinAgeDays)

$eligible = foreach ($property in $meta.time.PSObject.Properties) {
  $version = $property.Name
  if ($version -notmatch '^\d+\.\d+\.\d+$') {
    continue
  }

  $published = ([datetime]$property.Value).ToUniversalTime()
  if ($published -gt $cutoff) {
    continue
  }

  [pscustomobject]@{
    Package = $Package
    Version = $version
    PublishedUtc = $published.ToString('o')
    License = $meta.license
    Repository = $meta.'repository.url'
  }
}

$selected = $eligible | Sort-Object { [version]$_.Version } -Descending | Select-Object -First 1
if (-not $selected) {
  throw "No stable $Package version is at least $MinAgeDays days old."
}

if ($Json) {
  $selected | ConvertTo-Json -Compress
} else {
  "$($selected.Package)@$($selected.Version)"
}
