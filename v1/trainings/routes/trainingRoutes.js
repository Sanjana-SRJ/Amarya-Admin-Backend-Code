import express, { Router } from 'express';
const app = express()
const router = Router();
import {addNewTraining, requestUserTraining, trainingCardsData, getUserTrainingData, deleteUserTrainingData, deleteTrainingData} from '../controllers/trainingController.js';



app.post('/add-new-training', addNewTraining);
app.post('/request-new-training', requestUserTraining);trainingCardsData
app.get('/training-cards', trainingCardsData);
app.post('/user-training', getUserTrainingData);
app.delete('/delete-user-training', deleteUserTrainingData);
app.delete('/delete-training', deleteTrainingData);

app.use("/", router);

export default app;