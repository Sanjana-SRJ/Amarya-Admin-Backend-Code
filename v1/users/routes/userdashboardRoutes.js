import express, { Router } from 'express';
const app = express()
const router = Router();

import {fetchAnnouncements,getAllActivities,userProfileDashboard,uploadDashImage,getUserProject} from '../controllers/userDashboardController.js';

app.get('/dashboard-fetch-announcement',fetchAnnouncements);
app.get('/dashboard-fetch-activity', getAllActivities);
app.get('/dashboard-user-profile',userProfileDashboard);
app.post('/dashboard-image',uploadDashImage);
app.get('/dashboard-project',getUserProject);

app.use("/", router);
export default app;