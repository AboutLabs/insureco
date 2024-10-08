import { Application } from '@feathersjs/feathers';
import app from './app'; // Ensure this path matches your actual file structure

const port = app.get('port'); // Ensure the 'port' is defined in the configuration
const server = app.listen(port);

server.on('listening', () =>
  console.log(`Feathers app started on http://localhost:${port}`)
);
