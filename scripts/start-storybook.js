import { spawn } from 'child_process';
import runChecks from './check-storybook.js';

async function startStorybook() {
  console.log('🎨 Adsmagic Storybook Launcher\n');
  console.log('═'.repeat(50));
  
  // Executar verificações
  const checksOk = await runChecks();
  
  if (!checksOk) {
    console.error('\n❌ Verificações falharam. Corrija os erros antes de continuar.');
    process.exit(1);
  }
  
  console.log('═'.repeat(50));
  // Variável para controlar reinício automático
  let shouldRestart = true;
  
  // Função para iniciar e reiniciar Storybook em caso de falha
  const launchStorybook = () => {
    console.log('\n🚀 Iniciando Storybook Hub na porta 6006...\n');
    const sbProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd()
    });
    
    sbProcess.on('error', (error) => {
      console.error('❌ Erro ao iniciar Storybook:', error);
      if (!shouldRestart) process.exit(1);
    });
    
    sbProcess.on('exit', (code) => {
      if (shouldRestart) {
        console.error(`\n❌ Storybook encerrado com código ${code}. Reiniciando em 2s...`);
        setTimeout(launchStorybook, 2000);
      } else {
        process.exit(code || 0);
      }
    });
  };
  
  // Capturar Ctrl+C para encerrar graciosamente e parar reinícios
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Encerrando Storybook...');
    shouldRestart = false;
  });
  
  // Iniciar o loop de execução
  launchStorybook();
}

startStorybook();
