import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const hostname = 'localhost';
const port = 8080;

const server = createServer(async (req, res) => {
  const path = req.url;
  let data;
  try {
    if (path.includes('404')) throw new Error('404: Not found.');
    if (path === '/') {
      data = await readFile('./index.html');
    } else {
      data = await readFile(`.${path}.html`);
    }
    res.statusCode = 200;
  } catch (error) {
    data = await readFile('./404.html');
    res.statusCode = 404;
    console.log(error.message);
  }
  res.setHeader('Content-Type', 'text/html');
  res.end(data);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
