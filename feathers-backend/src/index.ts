import { app } from './app';  // Import the named export from app.ts

const port = app.get('port') || 3030;

async function startServer() {
  try {
    const server = await app.listen(port);  // Await the listen promise

    // Log when the server is ready
    server.on('listening', () =>
      console.log(`Feathers app started on http://localhost:${port}`)
    );

    // Handle server errors
    server.on('error', (error: any) => {
      console.error('Server encountered an error:', error);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
