Param(
    [string]$XmlPath = ".prompts/instructions.xml"
)
if (-not (Test-Path $XmlPath)) {
    Write-Error "Arquivo não encontrado: $XmlPath"; exit 1
}
[xml]$xml = Get-Content $XmlPath -Encoding UTF8
$includes = $xml.SelectNodes('//include')
$missing = @()
foreach ($n in $includes) {
    $p = $n.path
    if (-not (Test-Path $p)) { $missing += $p }
}
if ($missing.Count -gt 0) {
    Write-Error ("Faltando: " + ($missing -join ', '))
    exit 1
}
Write-Output "OK: includes válidos"
exit 0
