const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Class = require('../models/Class');

// Create class (teacher or admin)
router.post('/', auth(['admin', 'teacher']), async (req, res) => {
  try {
    const c = new Class(req.body);
    await c.save();
    res.json(c);
  } catch (err) { res.status(500).send('Server error'); }
});

// Get classes
router.get('/', auth(), async (req, res) => {
  const classes = await Class.find().populate('teacher', 'name email');
  res.json(classes);
});

module.exports = router;
