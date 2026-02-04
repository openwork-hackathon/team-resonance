const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// GET /api/tracks - List all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await prisma.track.findMany({
      include: { artist: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tracks/:id - Get track by ID
router.get('/:id', async (req, res) => {
  try {
    const track = await prisma.track.findUnique({
      where: { id: req.params.id },
      include: { artist: true }
    });
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tracks - Create new track
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      audioUrl,
      coverArtUrl,
      duration,
      genre,
      artistId
    } = req.body;
    
    const track = await prisma.track.create({
      data: {
        title,
        description,
        audioUrl,
        coverArtUrl,
        duration,
        genre,
        artistId
      },
      include: { artist: true }
    });
    
    res.status(201).json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;