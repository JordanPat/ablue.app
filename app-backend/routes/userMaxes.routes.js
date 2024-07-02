const express = require('express');
const router = express.Router();
const UserMax = require('../models/userMaxes.model'); // Adjust the path as needed

// GET all user maxes
router.get('/', async (req, res) => {
  try {
    const userMaxes = await UserMax.find();
    console.log("user maxes '/': ", userMaxes);
    res.json(userMaxes);
  } catch (error) {
    console.error('Error fetching user maxes:', error);
    res.status(500).json({ error: 'Failed to fetch user maxes' });
  }
});

// GET a user max by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userMax = await UserMax.findById(id);
    if (!userMax) {
      return res.status(404).json({ error: 'User max not found' });
    }
    res.json(userMax);
  } catch (error) {
    console.error('Error fetching user max:', error);
    res.status(500).json({ error: 'Failed to fetch user max' });
  }
});

// POST a new user max
router.post('/', async (req, res) => {
  const { max_10_rep, max_5_rep, max_3_rep, max_1_rep, exerciseId, userId } = req.body;
  try {
    const newUserMax = new UserMax({ max_10_rep, max_5_rep, max_3_rep, max_1_rep, exerciseId, userId });
    await newUserMax.save();
    res.status(201).json(newUserMax);
  } catch (error) {
    console.error('Error creating user max:', error);
    res.status(400).json({ error: 'Failed to create user max' });
  }
});

// PUT update a user max by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { max_10_rep, max_5_rep, max_3_rep, max_1_rep, exerciseId, userId } = req.body;
  try {
    const updatedUserMax = await UserMax.findByIdAndUpdate(
      id,
      { max_10_rep, max_5_rep, max_3_rep, max_1_rep, exerciseId, userId },
      { new: true, runValidators: true }
    );

    if (!updatedUserMax) {
      return res.status(404).json({ error: 'User max not found' });
    }

    res.json(updatedUserMax);
  } catch (error) {
    console.error('Error updating user max:', error);
    res.status(500).json({ error: 'Failed to update user max' });
  }
});

// DELETE a user max by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUserMax = await UserMax.findByIdAndDelete(id);
    if (!deletedUserMax) {
      return res.status(404).json({ error: 'User max not found' });
    }
    res.json({ message: 'User max deleted successfully' });
  } catch (error) {
    console.error('Error deleting user max:', error);
    res.status(500).json({ error: 'Failed to delete user max' });
  }
});

module.exports = router;
