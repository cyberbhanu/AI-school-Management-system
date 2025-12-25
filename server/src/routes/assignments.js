const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/auth');
const Assignment = require('../models/Assignment');


router.post('/', auth(['teacher']), async (req, res) => {
  try {
    const a = new Assignment(req.body);
    await a.save();
    res.json(a);
  } catch (err) { res.status(500).send('Server error'); }
});

router.post('/:id/submit', auth(['student']), upload.single('file'), async (req, res) => {
  try {
    const a = await Assignment.findById(req.params.id);
    a.submissions.push({ student: req.user.id, fileUrl: req.file.path });
    await a.save();
    res.json({ message: 'Submitted' });
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;
