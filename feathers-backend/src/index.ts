import app from './app';

console.log('Imported app:', app);
console.log('Imported app type:', typeof app);

if (app) {
  console.log('App properties:', Object.keys(app));
  console.log('App get method:', app.get);
}

async function startServer() {
  try {
    console.log('Starting server...');
    
    if (!app || typeof app.get !== 'function') {
      throw new Error('App is not properly initialized');
    }

    const port = app.get('port') || 3030;
    console.log('Retrieved port:', port);
    
    if (typeof port !== 'number') {
      throw new Error('Invalid port number');
    }

    console.log('Attempting to listen on port:', port);
    const server = await app.listen(port);
    console.log('Server created:', server);

    // Log when the server is ready
    server.on('listening', () => {
      console.log(`Feathers app started on http://localhost:${port}`);
    });

    // Manually trigger the 'listening' event if it hasn't fired
    if (server.listening) {
      server.emit('listening');
    }

    // Handle server errors
    server.on('error', (error: any) => {
      console.error('Server encountered an error:', error);
    });

    // Add a timeout to check if the server starts listening
    setTimeout(() => {
      if (server.listening) {
        console.log('Server is listening');
      } else {
        console.log('Server is not listening after 5 seconds');
      }
    }, 5000);

    console.log('Server setup complete');
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

startServer().then(() => {
  console.log('StartServer function completed');
}).catch((error) => {
  console.error('Unhandled error in startServer:', error);
  process.exit(1);
});
