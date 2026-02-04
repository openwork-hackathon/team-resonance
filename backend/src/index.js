const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'resonance-api',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  });
});

// Routes (to be implemented)
// app.use('/api/artists', require('./routes/artists'));
// app.use('/api/tracks', require('./routes/tracks'));
// app.use('/api/streams', require('./routes/streams'));

app.listen(PORT, () => {
  console.log(`🎵 Resonance API running on port ${PORT}`);
});

module.exports = app;