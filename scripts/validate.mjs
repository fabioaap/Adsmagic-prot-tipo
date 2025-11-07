
import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import detectPort from 'detect-port';
import waitOn from 'wait-on';

const PORTS_TO_CHECK = [3000, 4100, 6006, 6008, 7007];

const SERVERS = [
    {
        name: 'Dashboard React',
        cmd: 'npm',
        args: ['run', 'dev', '--workspace=apps/dashboard-react'],
        port: 3000,
    },
    {
        name: 'Storybook React',
        cmd: 'npm',
        args: ['run', 'dev:react'],
        port: 6008,
    },
    {
        name: 'Storybook Vue',
        cmd: 'npm',
        args: ['run', 'dev:vue'],
        port: 7007,
    },
    {
        name: 'Storybook Hub',
        cmd: 'npm',
        args: ['run', 'dev'],
        port: 6006,
    },
    {
        name: 'Protótipo Legado',
        cmd: 'npm',
        args: ['run', 'dev:legacy'],
        port: 4100,
    },
];

async function runStep(title, command, args = [], options = {}) {
    const spinner = ora(chalk.blue(`[Em andamento] ${title}`)).start();
    try {
        const promise = execa(command, args, { shell: true, ...options });
        const result = await promise;
        spinner.succeed(chalk.green(`[Sucesso] ${title}`));
        return result;
    } catch (error) {
        spinner.fail(chalk.red(`[Falha] ${title}`));
        console.error(chalk.red(error.stderr || error.stdout || 'Erro desconhecido.'));
        throw new Error(`Falha na etapa: ${title}`);
    }
}

async function checkPorts() {
    const spinner = ora(chalk.blue('Verificando portas necessárias...')).start();
    const busyPorts = [];
    for (const port of PORTS_TO_CHECK) {
        const newPort = await detectPort(port);
        if (newPort !== port) {
            busyPorts.push(port);
        }
    }

    if (busyPorts.length > 0) {
        spinner.fail(chalk.yellow(`Portas ocupadas detectadas: ${busyPorts.join(', ')}`));
        console.warn(chalk.yellow('Por favor, libere essas portas antes de continuar.'));
        // Em uma versão futura, poderíamos oferecer para matar os processos.
        throw new Error('Portas necessárias estão em uso.');
    }
    spinner.succeed(chalk.green('Todas as portas estão livres.'));
}


async function startServers() {
    const procs = [];
    for (const srv of SERVERS) {
        const spinner = ora(chalk.blue(`[Iniciando] ${srv.name}`)).start();
        try {
            const proc = execa(srv.cmd, srv.args, { shell: true, stdio: 'inherit' });
            procs.push({ name: srv.name, proc });
            spinner.succeed(chalk.green(`[OK] ${srv.name} iniciado.`));
        } catch (err) {
            spinner.fail(chalk.red(`[Falha] ${srv.name}`));
            throw err;
        }
    }
    return procs;
}

async function waitForServers() {
    const resources = SERVERS.map(srv => `tcp:localhost:${srv.port}`);
    const spinner = ora(chalk.blue('Aguardando todos os servidores ficarem prontos...')).start();
    try {
        await waitOn({ resources, timeout: 60000 });
        spinner.succeed(chalk.green('Todos os servidores estão prontos!'));
    } catch (err) {
        spinner.fail(chalk.red('Timeout ao aguardar servidores.'));
        throw err;
    }
}

async function killServers(procs) {
    for (const { name, proc } of procs) {
        if (proc && proc.kill) {
            proc.kill();
            ora().info(chalk.yellow(`[Finalizado] ${name}`));
        }
    }
}

async function main() {
    console.log(chalk.bold.cyan('🚀 Iniciando Validação Completa da Plataforma Adsmagic 🚀'));
    const startTime = Date.now();
    let serverProcs = [];
    try {
        await checkPorts();
        serverProcs = await startServers();
        await waitForServers();
        await runStep('Build de todos os pacotes e apps', 'npm', ['run', 'build']);
        await runStep('Execução de testes unitários (Vitest)', 'npm', ['test']);
        await runStep('Execução de testes E2E (Playwright)', 'npm', ['run', 'test:e2e']);
        console.log(chalk.green.bold('\n✅ Validação concluída com sucesso!'));
    } catch (error) {
        console.error(chalk.red.bold(`\n❌ A validação falhou. Verifique os logs acima.`));
        process.exit(1);
    } finally {
        await killServers(serverProcs);
        const duration = (Date.now() - startTime) / 1000;
        console.log(chalk.cyan(`\n✨ Processo finalizado em ${duration.toFixed(2)} segundos.`));
    }
}

main();
