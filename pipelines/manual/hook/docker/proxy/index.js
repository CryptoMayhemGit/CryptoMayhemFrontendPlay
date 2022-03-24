const url = require('url')
const http = require('http')
const httpProxy = require('http-proxy')

const PORT = 9545


const proxy = httpProxy.createProxyServer({})

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true)
    const query = parsedUrl.query
    const token = query.token

    proxy.web(req, res, { 
        target: 'https://nginx:8545/', 
        headers: { 
            'Authorization': `Basic ${token}`
        }
    })

})

console.log(`proxy live on port ${PORT}`)

server.listen(PORT)
