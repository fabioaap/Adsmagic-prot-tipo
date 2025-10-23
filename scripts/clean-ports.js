import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const PORTS = [6006, 6008, 7007];

console.log('🧹 Limpando portas ocupadas...\n');

async function killProcessOnPort(port) {
  try {
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    if (!stdout.trim()) {
      console.log(`   ✅ Porta ${port} já está livre`);
      return;
    }

    const lines = stdout.trim().split('\n');
    const pids = new Set();
    
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && !isNaN(pid) && pid !== '0') {
        pids.add(pid);
      }
    }

    if (pids.size > 0) {
      console.log(`   🔄 Liberando porta ${port} (PIDs: ${Array.from(pids).join(', ')})...`);
      for (const pid of pids) {
        try {
          await execAsync(`taskkill /F /PID ${pid} 2>nul`);
        } catch {}
      }
      console.log(`   ✅ Porta ${port} liberada`);
    }
  } catch (error) {
    console.log(`   ✅ Porta ${port} livre`);
  }
}

async function cleanPorts() {
  for (const port of PORTS) {
    await killProcessOnPort(port);
  }
  console.log('\n✅ Limpeza concluída!\n');
}

cleanPorts().catch(console.error);
