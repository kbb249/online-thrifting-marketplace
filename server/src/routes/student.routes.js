// server/src/routes/student.routes.js
const express = require('express');
const router = express.Router();

// Import the controller function
const studentController = require('../controllers/student.controller');

// POST /api/students/verify
// This is the endpoint the front-end will call when a user submits an email.

router.post('/send-code', studentController.sendCode);

// new route for the second step
router.post('/verify-code/', studentController.verifyCode);

// You will add more routes here later, such as:
// router.post('/upload', studentController.handleDocumentUpload);
// router.post('/token/:token', studentController.validateToken);

module.exports = router;