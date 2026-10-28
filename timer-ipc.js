setTimeout(() => {
    process.on("message", (msg) => {
        console.log("Child recievd", msg)
        process.send({reply: "Hello from child"})   
        process.exit(0)
    })
}, 4000);