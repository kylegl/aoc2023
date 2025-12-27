import fs from 'node:fs'
import { createServer } from 'node:http'

const port = 3000

const server = createServer((req, res) => {
  const url = req.url
  router(url, req, res)
})

server.listen(port, (err) => {
  if (err) {
    console.error('Error: ', err)
    return
  }

  console.log('Server listening on port ', port)
})

function router(url, req, res) {
  if (url === '/') {
    getFile('./index.html', res, 'text/html')
  }
  else if (url === '/app.js') {
    getFile('./app.js', res, 'application/javascript')
  }
  else if (url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    })

    res.write('Server-sent event connection established\n\n')

    const eventInterval = setInterval(
      () => res.write(`data: ${JSON.stringify({ timestamp: Date.now() })}\n\n`),
      1000,
    )

    res.on('close', () => clearInterval(eventInterval))
  }
}

function getFile(path, res, contentType) {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>404 Not Found</h1>')
      return
    }

    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  })
}
