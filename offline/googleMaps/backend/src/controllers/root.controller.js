import { v2 as cloudinary } from 'cloudinary';
import Feedback from '../models/root.model.js';
import 'dotenv/config';
import { respond } from '../utils/respond.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


export const submitFeedback = (req, res) => {
  try {
    const { locationId, lng, lat, status, issues, severity, passable_by, notes } = req.body;
    let imageUrl = '';

    if(req.file) {
      const result = await cloudinary.uploader(req.file.path, {
        transformation: [{ effect: "pixelate_faces:20"}]
      });
      imageUrl = result.secure_url;
    }

    const newFeedback = new Feedback({
      locationId,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      },
      status,
      issues: JSON.parse(issues),
      severity,
      passable_by: JOSN.parse(passable_by),
      image_url: imageUrl,
      additional_notes: notes || '',
      is_ai_verified: false
    });

    await newFeedback.save();
    respond(res, true, 201, newFeedback, {});
  } catch (error) {
    console.log(`Error in root.controller.js AIOverview... \n${error}`);
    respond(res, false, 500, {}, 'Server Issue, Try Again...')
  }
}

export const AIOverview = (req, res) => {
  console.log('AIOverview');
}