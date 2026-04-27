import express from 'express';
import { AIOverview, submitFeedback } from '../controllers/root.controller.js';

import multer from 'multer';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });


router.get('/feedback', upload.single('image'), submitFeedback);
router.post('/ai-overview', AIOverview);

export default router;