import { validationResult } from "express-validator";
import { fetchAnnouncementsQuery, fetchActivityQuery,userDashboardProfileQuery,fetchUserProjectQuery } from "../models/userDashboardQuery.js";
import { successResponse, errorResponse, notFoundResponse } from "../../../utils/response.js";
import dotenv from "dotenv";
// import { incrementId } from "../../helpers/functions.js"
dotenv.config();



export const fetchAnnouncements = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "")
    }

    let [data] = await fetchAnnouncementsQuery();
    return successResponse(res, data, 'Announcements Fetched Successfully');
  } catch (error) {
    next(error);
  }
}

export const getAllActivities = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }

    let [data] = await fetchActivityQuery();
    return successResponse(res, data, "Activiy Fetched Successfully");
  } catch (err) {
    next(err);
  }
};

export const userProfileDashboard = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "")
    }
    const { emp_id } = req.body;
    const [data] = await userDashboardProfileQuery([emp_id])
    if (data.length == 0) {
      return notFoundResponse(res, '', 'Employee Data  not found.');
    }
    return successResponse(res, data, ' Employee Data Found successfully');
  } catch (error) {
    next(error);
  }
}

export const getDashImage = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "")
    }
    
    
  } catch (error) {
    next(error);
  }
}


export const getUserProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "")
    }
    const { emp_id } = req.body;
    const [data] = await fetchUserProjectQuery([emp_id])
    if (data.length == 0) {
      return notFoundResponse(res, '', 'user project not fetched successfully');
    }
    return successResponse(res, data, 'user project fetched successfully');
  } catch (error) {
    next(error);
  }
}


