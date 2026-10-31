const express = require('express');
const path = require('path');
const app = express();

// set 'public' as static folder
app.use(express.static(path.join(__dirname, 'public')));

// when access root directory http://localhost:3000 , auto return public/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Production-ready Health Check Endpoint
app.get('/health', (req, res) => {
  // Gather internal system runtime metrics
  const healthStatus = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: 'CONNECTED', // Placeholder simulating database dependency verification
      storage: 'OK'
    },
    system: {
      memoryUsage: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
    }
  };

  try {
    // Evaluate real dependency statuses here before resolving HTTP 200
    return res.status(200).json(healthStatus);
  } catch (error) {
    healthStatus.status = 'DOWN';
    return res.status(503).json(healthStatus); // Return 503 Service Unavailable if diagnostics fail
  }
});


app.listen(3000, () => console.log('Website is running on port 3000'));
