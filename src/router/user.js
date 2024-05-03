module.exports = (fastify, _, done) => {
    fastify.get("/",(req, res)=>{
        res.send("hello")
    })
    done()
} 