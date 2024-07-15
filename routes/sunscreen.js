const express = require('express');
const router = express.Router();
const Sunscreen = require('../models/sunscreen');

// Get all sunscreens
router.get('/', async (req, res) => {
  try {
    const sunscreens = await Sunscreen.find();
    res.json(sunscreens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a sunscreen
router.post('/', async (req, res) => {
  const sunscreen = new Sunscreen({
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    harga: req.body.harga
  });
  try {
    const newSunscreen = await sunscreen.save();
    res.status(201).json(newSunscreen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific sunscreen
router.get('/:id', getSunscreen, (req, res) => {
  res.json(res.sunscreen);
});

// Update a sunscreen
router.patch('/:id', getSunscreen, async (req, res) => {
  if (req.body.nama != null) {
    res.sunscreen.nama = req.body.nama;
  }
  if (req.body.deskripsi != null) {
    res.sunscreen.deskripsi = req.body.deskripsi;
  }
  if (req.body.harga != null) {
    res.sunscreen.harga = req.body.harga;
  }
  try {
    const updatedSunscreen = await res.sunscreen.save();
    res.json(updatedSunscreen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a sunscreen
// Delete a sunscreen by name
// Delete a sunscreen by name
router.delete('/:nama', getSunscreenByName, async (req, res) => {
  try {
    await Sunscreen.deleteOne({ nama: req.params.nama }); // Menggunakan req.params.nama untuk menghapus berdasarkan nama
    res.json({ message: 'Deleted Sunscreen' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSunscreenByName(req, res, next) {
  let sunscreen;
  try {
    sunscreen = await Sunscreen.findOne({ nama: req.params.nama }); // Mencari sunscreen berdasarkan nama
    if (sunscreen == null) {
      return res.status(404).json({ message: 'Cannot find sunscreen' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.sunscreen = sunscreen;
  next();

}



module.exports = router;
