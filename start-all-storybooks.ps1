# Script para iniciar todos os Storybooks em janelas separadas
# Uso: .\start-all-storybooks.ps1

Write-Host "Iniciando todos os Storybooks..." -ForegroundColor Cyan

# Diretorio base
$baseDir = "c:\Users\Educacross\Documents\Adsmagic\Protipo\Adsmagic-prot-tipo"

# Iniciar React (porta 6008)
Write-Host "Iniciando React Storybook (porta 6008)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $baseDir\apps\storybook-react; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 2

# Iniciar Vue (porta 7007)
Write-Host "Iniciando Vue Storybook (porta 7007)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $baseDir\apps\storybook-vue; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 2

# Iniciar Hub (porta 6006)
Write-Host "Iniciando Hub Storybook (porta 6006)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $baseDir\apps\storybook-hub; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "Todos os Storybooks foram iniciados!" -ForegroundColor Cyan
Write-Host ""
Write-Host "URLs disponiveis:" -ForegroundColor Yellow
Write-Host "   Hub:   http://localhost:6006/" -ForegroundColor White
Write-Host "   React: http://localhost:6008/" -ForegroundColor White
Write-Host "   Vue:   http://localhost:7007/" -ForegroundColor White
Write-Host ""
Write-Host "Aguarde ~15 segundos para todos iniciarem completamente" -ForegroundColor Yellow
