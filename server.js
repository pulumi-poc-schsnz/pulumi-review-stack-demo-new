const http = require('http');
const port = process.env.PORT || 8001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head><title>Pulumi Demo</title></head>
    <body>
      <h1>Hello from Pulumi Review Stacks!</h1>
      <p>Environment: <strong>${process.env.ENVIRONMENT || 'production'}</strong></p>
      <p>Port: <strong>${port}</strong></p>
      <p>Version: 1.0.0</p>
    </body>
    </html>
  `);
});

server.listen(port, () => console.log(`Running on port ${port}`));