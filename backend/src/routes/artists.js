const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// GET /api/artists - List all artists
router.get('/', async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({
      include: { tracks: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/artists/:wallet - Get artist by wallet
router.get('/:wallet', async (req, res) => {
  try {
    const artist = await prisma.artist.findUnique({
      where: { wallet: req.params.wallet },
      include: { tracks: true }
    });
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/artists - Register new artist
router.post('/', async (req, res) => {
  try {
    const { wallet, name, bio, avatarUrl } = req.body;
    
    // Check if artist already exists
    const existing = await prisma.artist.findUnique({
      where: { wallet }
    });
    if (existing) {
      return res.status(409).json({ error: 'Artist already registered' });
    }
    
    const artist = await prisma.artist.create({
      data: {
        wallet,
        name,
        bio,
        avatarUrl,
        verified: false
      }
    });
    
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;