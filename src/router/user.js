module.exports = (fastify, _, done) => {
    fastify.get("/",(req, res)=>{
        res.send("hello")
    })
    fastify.post("/signup",async (req, res)=>{
        const body = req.body
        res.send("/signup\n"+body)
    })
    fastify.post("/signin",async (req, res)=>{
        const body = req.body
        res.send("/signin\n"+body)
    })
    fastify.post("/signout",async (req, res)=>{
        const body = req.body
        res.send("/signout\n"+body)
    })
    fastify.post("/forgetpswd",async (req, res)=>{
        const body = req.body
        res.send("/forgetpswd\n"+body)
    })
    done()
} 