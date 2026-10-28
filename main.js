const {exec, spawn, fork} = require('child_process')

// Exec
exec('dir /A', (error, stdout, stderr) => {
    if (error) return console.error(`Exec error: ${error}`)
    if (stderr) console.error(`stder: ${stderr}`)
    console.log(`stdout: ${stdout}`)
    console.log("Procés finalitzat amb normalitat")
    process.exit(0)
})

// Spawn
const timer = spawn("node", ["timer-stdout.js"])

timer.stdout.on("data", (data) => {
    console.log(`stodout:\n ${data}`)
})

timer.stderr.on("data", (data) => {
    console.log(`stoderr:\n ${data}`)
    process.exit(0)
})

timer.on("error", (error) => {
    console.error(`error: ${error.message}`)
})

timer.on("close", (code) => {
    console.log(`child process salida: ${code}`)
})


// Fork
const process = fork("./timer-ipc.js")

process.send({hello: "Hello World"})

process.on("message", (msg) => {
    console.log("Parent, child says:", msg)
})

process.on("exit", (code) => {
    console.log(`Tancat ${code}`)
})
