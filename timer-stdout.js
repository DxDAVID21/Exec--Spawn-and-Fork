let n = 0

const interval = setInterval(() => {
    n++
    console.log('tick ' + n)

    if (n === 5) {
        clearInterval(interval)
        process.stdout.write('FINALITZAT\n', () => process.exit(0))
    }
}, 4000)
