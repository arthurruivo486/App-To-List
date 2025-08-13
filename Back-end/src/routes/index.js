import express from 'express';
const router = express.Router();

import userRoute from './userRoute.js';
import taskRoute from './taskRoute.js'

router.use('/', userRoute);
router.use('/', taskRoute);

export default router;