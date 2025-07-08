//ADD NEW ELECTIOn
//POST: /api/elections

import HttpError from "../models/ErrorModel.js";
import { v4 as UUID } from "uuid";
import cloudinary from "../utils/cloudinary.js";
import electionModel from "../models/electionModel.js";
import candidateModel from "../models/candidateModal.js";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";


//PROTECTED(only admin can add election)
export const addElection = async(req, res, next) => {
  
  //only admin can add election
   if(!req.user.isAdmin) {
    return next(new HttpError("Only Admoin can perform thisaction.", 403));
   }
  const { title, description} = req.body;
  if (!title || !description) {
    return next (new HttpError("Fill all Fields",422))
  }
if(!req.files || !req.files.thumbnail) {
  return next (new HttpError("Choose a thumbnail", 422));
}
 if (!req.files || !req.files.thumbnail) {
    return next(new HttpError("Choose a thumbnail", 422));
  }

  const { thumbnail } = req.files;

  if (thumbnail.size > 1024 * 1024) {
    return next(new HttpError("Thumbnail size should be less than 1MB", 422));
  }

  // Rename the image file
  let fileName = thumbnail.name.split(".");
  fileName = fileName[0] + UUID() + "." + fileName[fileName.length - 1];

  try {
    // Ensure uploads/elections folder exists
    const uploadDir = path.join("uploads", "elections");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Move file to local uploads folder
    const localFilePath = path.join(uploadDir, fileName);
    await thumbnail.mv(localFilePath);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    if (!result.secure_url) {
      return next(new HttpError("Failed to upload thumbnail to Cloudinary", 500));
    }

    // Save election to DB
    const newElection = await electionModel.create({
      title,
      description,
      thumbnail: result.secure_url,
    });

    res.json(newElection);
} catch (err) {
  console.error("Error caught in catch block:", err);
  return next(new HttpError("Failed to upload thumbnail", 500));
}
}






//GET ALL ELECTIOn
//GET: /api/elections
//PROTECTED(only admin can add election)
/* eslint-disable no-unused-vars */

export const getElections = async (req, res, next) => {
  
  // Replace with your logic
  try{
    const elections = await electionModel.find();
    res.status(200).json(elections);
  } catch (error) {
     console.error("❌ getElections error:", error);
    return next(new HttpError(error));
  }
};




//GET Single ELECTIOn
//GET: /api/elections/:id
//PROTECTED(only admin can add election)

export const getElection = async (req, res, next) => {

 // Replace with your logic
 try {
  const {id} = req.params;
  const election = await electionModel.findById(id);
  res.status(200).json(election);
  
 } catch (error) {
  return next(new HttpError(error));
  
 }
};




//Get Election Candidates
//GET: /api/elections/id/candidates
//PROTECTED(only admin can add election)

export const getCandidatesOfElection = async (req, res, next) => {
 
  // Replace with your logic
 try {
  const {id} = req.params;
  
if (!mongoose.Types.ObjectId.isValid(id)) {
  return next(new Error('Invalid election ID'));
}

  const candidates = await candidateModel.find({ election: id });
  if (candidates.length === 0) {
      console.log(`❌ No candidates found for election ${id}`);
    } else {
      console.log(`✅ Found ${candidates.length} candidates`);
    }
  
  res.status(200).json(candidates);
 } catch (error) {
  console.error("❌ Error fetching candidates:", error);
  return next(new HttpError(error));
  
 }
};



//Get Voters of Election
//GET: /api/elections/:id/voters
//PROTECTED(only admin can add election)

export const getElectionVoters = async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid election ID" });
  }

  try {
    // Find election and populate voters
    const response = await electionModel.findById(id).populate("voters");

    // Check if election exists
    if (!response) {
      return res.status(404).json({ message: "Election not found" });
    }

    // Return the populated voters
    res.status(200).json(response.voters);
  } catch (error) {
    console.error("Error fetching voters:", error.message);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};




//UPDATE  ELECTIOn
//PATCH: /api/elections/:id
//PROTECTED(only admin can add election)

export const updateElection = async (req, res, next) => {
  
  // Replace with your logic
  try {
    if (!req.user || !req.user.isAdmin) {
      console.log("Current user:", req.user);

      return next(new HttpError("Only Admin can perform this action.", 403));
    }
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new HttpError("Fill all Fields", 422));
    }
    if (!req.files || !req.files.thumbnail) {
  return next(new HttpError("Choose a thumbnail", 422));
}

const { thumbnail } = req.files;

if (thumbnail.size > 1024 * 1024) {
  return next(new HttpError("Thumbnail size should be less than 1MB", 422));
}

let fileName = req.files.thumbnail.name.split(".");
fileName = fileName[0] + UUID() + "." + fileName[fileName.length - 1];  
thumbnail.mv(`uploads/elections/${fileName}`, async (err) => {
  if (err) {
    return next(new HttpError("Failed to upload thumbnail", 500));
  }
  const result = await cloudinary.uploader.upload(`uploads/elections/${fileName}`, {
    resource_type: "image",
  });
  if (!result.secure_url) {
    return next(new HttpError("Failed to upload thumbnail to Cloudinary", 500));
  }
  const updatedElection = await electionModel.findByIdAndUpdate(
    id,
    { title, description, thumbnail: result.secure_url },
    { new: true }
  );
  res.status(200).json("Election updated successfully",402);
});
} catch (error) {
  return next(new HttpError(error));
  
}
};




//Delete ELECTIOn
//DELETE: /api/elections/:id
//PROTECTED(only admin can add election)
export const removeElection = async (req, res, next) => {
  
  // Replace with your logic
  try {
    if (!req.user || !req.user.isAdmin) {
       return next(new HttpError("Only Admin can perform this action.", 403));
    }
    const { id } = req.params;
   
    const deletedElection = await electionModel.findByIdAndDelete(id);
    if (!deletedElection) {
      return next(new HttpError("Election not found", 404));
    }
    res.status(200).json({ message: "Election deleted successfully" });
  } catch (error) {
    return next(new HttpError(error));
  }
}
