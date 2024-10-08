import { app } from './app';  // Import the named export from app.ts

async function startServer() {
  try {
    const server = await app.listen(app.get('port') || 3030);  // Await the listen promise

    // Log when the server is ready
    server.on('listening', () =>
      console.log(`Feathers app started on http://localhost:${server.address().port}`)
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
