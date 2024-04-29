import express, { Router } from 'express';
import { createProjectVal, deleteIdVal, updateProjectVal,createUserProjectVal,userUpdateProjectVal } from '../../../utils/validation.js';
import { createProject, deleteProject, fetchProjects, updateProject } from '../controllers/projectController.js';
import {createUserProject,fetchUserProjects,userUpdateProject} from '../controllers/userProjectController.js';
const app = express()
const router = Router();

app.post('/admin/create-project', createProjectVal, createProject);
app.put('/admin/update-project/:id/:category_id',updateProjectVal, updateProject);
app.get('/admin/fetch-all-projects', fetchProjects);
app.delete('/admin/delete-project/:id/:category_id',deleteIdVal, deleteProject);
app.post('/user-profile-project/',createUserProjectVal,createUserProject)
app.get('/fetch-user-project', fetchUserProjects);
app.put('/update-user-project/:project_id',userUpdateProjectVal, userUpdateProject);


app.use("/", router);

export default app;