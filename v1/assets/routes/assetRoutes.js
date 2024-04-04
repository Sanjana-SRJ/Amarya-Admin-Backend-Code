import express, { Router } from 'express';
const app = express()
const router = Router();
import {crAssVal, assReqVal, fetUserAssVal, delAssVal, upAssVal} from '../../../utils/validation.js'
import {createAsset, assetRequest, fetchUserAssets, deleteAsset, fetchAssets, updateAsset} from '../controllers/assetController.js';




app.post('/admin/create-asset',crAssVal, createAsset);
app.post('/asset-request',assReqVal, assetRequest);
app.post('/user-asset',fetUserAssVal, fetchUserAssets);
app.get('/admin/fetch-assigned-assets', fetchAssets);
app.delete('/admin/delete-asset',delAssVal, deleteAsset);
app.put('/admin/update-asset/:id',upAssVal, updateAsset);

app.use("/", router);

export default app;