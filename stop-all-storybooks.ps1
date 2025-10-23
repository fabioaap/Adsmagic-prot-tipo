# Script para parar todos os Storybooks
# Uso: .\stop-all-storybooks.ps1

Write-Host "🛑 Parando todos os processos Node.js..." -ForegroundColor Red

# Matar todos os processos node.exe
taskkill /F /IM node.exe 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Todos os Storybooks foram parados!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Nenhum processo Node.js estava rodando" -ForegroundColor Yellow
}
