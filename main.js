const { exec, spawn, fork } = require('child_process')

// EXEC
const comanda = process.platform === 'win32' ? 'dir' : 'ls -la'

exec(comanda, (error, stdout, stderr) => {
    console.log('\n--- EXEC ---')

    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)

    if (error) {
        console.log('Ha fallat. Codi:', error.code)
    } else {
        console.log('Ha acabat be. Codi: 0')
    }
})

// SPAWN
const fillSpawn = spawn('node', ['timer-stdout.js'])

fillSpawn.stdout.on('data', (dades) => {
    process.stdout.write(`[spawn] ${dades}`)
})

fillSpawn.stderr.on('data', (dades) => {
    process.stderr.write(`[spawn stderr] ${dades}`)
})

fillSpawn.on('error', (error) => {
    console.error('Error al spawn:', error.message)
})

fillSpawn.on('close', (codi) => {
    console.log('Spawn acabat. Codi:', codi)
})

// FORK
const fillFork = fork('timer-ipc.js')

fillFork.on('message', (missatge) => {
    console.log('[fork]', missatge)
})

fillFork.on('error', (error) => {
    console.error('Error al fork:', error.message)
})

fillFork.on('close', (codi) => {
    console.log('Fork acabat. Codi:', codi)
})
