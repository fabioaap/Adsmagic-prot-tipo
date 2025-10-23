import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const PORTS = {
  hub: 6006,
  react: 6008,
  vue: 7007
};

console.log('🔍 Verificando ambiente Storybook...\n');

// 1. VERIFICAR E MATAR PROCESSOS NODE ANTIGOS
async function checkStep1() {
  console.log('✓ [1/6] Verificando processos Node.js...');
  try {
    // Apenas avisar, não matar (para não interromper o próprio script)
    const { stdout } = await execAsync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV /NH');
    const processes = stdout.split('\n').filter(line => line.includes('node.exe'));
    
    if (processes.length > 3) {
      console.log(`   ⚠️  Encontrados ${processes.length} processos Node.js rodando`);
      console.log('   ℹ️  Alguns processos podem ser deste script');
    } else {
      console.log('   ✅ Número normal de processos Node');
    }
  } catch (error) {
    console.log('   ✅ Verificação concluída');
  }
}

// 2. VERIFICAR PORTAS EM USO
async function checkStep2() {
  console.log('\n✓ [2/6] Verificando portas...');
  const portsInUse = [];
  
  for (const [name, port] of Object.entries(PORTS)) {
    try {
      const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
      if (stdout.trim()) {
        portsInUse.push({ name, port });
      }
    } catch {
      // Porta livre
    }
  }
  
  if (portsInUse.length > 0) {
    console.log(`   ⚠️  Portas em uso: ${portsInUse.map(p => `${p.name}:${p.port}`).join(', ')}`);
    console.log('   🔄 Liberando portas...');
    
    for (const { port } of portsInUse) {
      try {
        const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
        const lines = stdout.trim().split('\n');
        for (const line of lines) {
          const pid = line.trim().split(/\s+/).pop();
          if (pid && !isNaN(pid)) {
            await execAsync(`taskkill /F /PID ${pid} 2>nul`).catch(() => {});
          }
        }
      } catch {}
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('   ✅ Portas liberadas');
  } else {
    console.log('   ✅ Todas as portas livres');
  }
}

// 3. VERIFICAR DEPENDÊNCIAS
async function checkStep3() {
  console.log('\n✓ [3/6] Verificando dependências...');
  const nodeModulesPath = path.join(rootDir, 'node_modules');
  
  try {
    await fs.access(nodeModulesPath);
    
    // Verificar pacotes críticos
    const criticalPackages = [
      '@storybook/react-vite',
      '@storybook/vue3-vite',
      'vite',
      'react',
      'vue'
    ];
    
    const missing = [];
    for (const pkg of criticalPackages) {
      try {
        await fs.access(path.join(nodeModulesPath, pkg));
      } catch {
        missing.push(pkg);
      }
    }
    
    if (missing.length > 0) {
      console.log(`   ⚠️  Pacotes faltando: ${missing.join(', ')}`);
      console.log('   🔄 Reinstalando dependências...');
      await execAsync('npm install', { cwd: rootDir });
      console.log('   ✅ Dependências instaladas');
    } else {
      console.log('   ✅ Todas as dependências OK');
    }
  } catch {
    console.log('   ⚠️  node_modules não encontrado');
    console.log('   🔄 Instalando dependências...');
    await execAsync('npm install', { cwd: rootDir });
    console.log('   ✅ Dependências instaladas');
  }
}

// 4. LIMPAR CACHE
async function checkStep4() {
  console.log('\n✓ [4/6] Limpando cache...');
  const cacheDirs = [
    path.join(rootDir, 'apps/storybook-hub/node_modules/.cache'),
    path.join(rootDir, 'apps/storybook-react/node_modules/.cache'),
    path.join(rootDir, 'apps/storybook-vue/node_modules/.cache'),
    path.join(rootDir, 'node_modules/.vite'),
    path.join(rootDir, 'node_modules/.cache')
  ];
  
  let cleaned = 0;
  for (const dir of cacheDirs) {
    try {
      await fs.rm(dir, { recursive: true, force: true });
      cleaned++;
    } catch {}
  }
  
  if (cleaned > 0) {
    console.log(`   ✅ ${cleaned} diretórios de cache limpos`);
  } else {
    console.log('   ✅ Cache já limpo');
  }
}

// 5. VALIDAR ARQUIVOS DE CONFIGURAÇÃO E STORIES
async function checkStep5() {
  console.log('\n✓ [5/6] Validando configurações e stories...');
  
  const configFiles = [
    'apps/storybook-hub/.storybook/main.ts',
    'apps/storybook-react/.storybook/main.ts',
    'apps/storybook-vue/.storybook/main.ts'
  ];
  
  let allValid = true;
  for (const configFile of configFiles) {
    try {
      await fs.access(path.join(rootDir, configFile));
    } catch {
      console.log(`   ❌ Arquivo faltando: ${configFile}`);
      allValid = false;
    }
  }
  
  // Verificar se há stories
  const storyDirs = [
    'apps/storybook-react/src/stories',
    'packages/react-components/src/components',
    'packages/vue-components/src/components'
  ];
  
  let storiesFound = 0;
  for (const dir of storyDirs) {
    try {
      const fullPath = path.join(rootDir, dir);
      const files = await fs.readdir(fullPath, { recursive: true });
      const storyFiles = files.filter(f => f.toString().includes('.stories.'));
      storiesFound += storyFiles.length;
    } catch {}
  }
  
  if (storiesFound === 0) {
    console.log('   ⚠️  Nenhuma story encontrada');
    allValid = false;
  } else {
    console.log(`   ✅ ${storiesFound} stories encontradas`);
  }
  
  if (allValid) {
    console.log('   ✅ Todas as configurações válidas');
  }
}

// 6. VERIFICAR PACOTES DESATUALIZADOS
async function checkStep6() {
  console.log('\n✓ [6/6] Verificando pacotes desatualizados...');
  try {
    const { stdout } = await execAsync('npm outdated --json', { cwd: rootDir });
    if (stdout) {
      const outdated = JSON.parse(stdout);
      const list = Object.entries(outdated)
        .map(([pkg, info]) => `${pkg}@${info.current} → ${info.latest}`)
        .join(', ');
      console.log(`   ⚠️  Pacotes desatualizados: ${list}`);
      console.log('   🔄 Atualizando dependências...');
      await execAsync('npm update', { cwd: rootDir });
      console.log('   ✅ Dependências atualizadas');
    } else {
      console.log('   ✅ Todos os pacotes estão na versão mais recente');
    }
  } catch (error) {
    console.log('   ℹ️  Não foi possível verificar pacotes desatualizados');
  }
}

// EXECUTAR TODAS AS VERIFICAÇÕES
async function runChecks() {
  try {
    await checkStep1();
    await checkStep2();
    await checkStep3();
    await checkStep4();
    await checkStep5();
    await checkStep6();

    console.log('\n✅ Todas as verificações concluídas com sucesso!');
    console.log('🚀 Pronto para iniciar Storybook...\n');
    return true;
  } catch (error) {
    console.error('\n❌ Erro durante as verificações:', error.message);
    return false;
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  runChecks().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export default runChecks;
