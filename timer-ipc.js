let n = 0

const interval = setInterval(() => {
    n++
    process.send({ type: 'tick', n })

    if (n === 5) {
        clearInterval(interval)
        process.send({ type: 'done' }, () => process.exit(0))
    }
}, 4000)
