import { app } from './app';

async function startServer() {
  try {
    const port = app.get('port') || 3030;
    if (typeof port !== 'number') {
      throw new Error('Invalid port number');
    }

    const server = await app.listen(port);

    // Log when the server is ready
    server.on('listening', () => {
      console.log(`Feathers app started on http://localhost:${port}`);
    });

    // Handle server errors
    server.on('error', (error: any) => {
      console.error('Server encountered an error:', error);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
