import { v4 as uuid } from "uuid";
import cloudinary from "../utils/cloudinary.js";
import electionModel from "../models/electionModel.js";
import candidateModel from "../models/candidateModal.js";
import voterModel from "../models/voterModel.js";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Readable } from "stream"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import HttpError from "../models/ErrorModel.js";
import { log } from "console";

// ADD CANDIDATE TO ELECTION
// POST: /api/candidates
// PROTECTED (only admin)
export const addCandidate = async (req, res, next) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    if (!req.user?.isAdmin) {
      return next(new HttpError("Only Admin can perform this action.", 403));
    }

    const { fullName, motto, currentElection } = req.body;

    if (!fullName || !motto || !currentElection) {
      return next(new HttpError("Fill all fields", 422));
    }

    if (!req.files || !req.files.image) {
      return next(new HttpError("Choose an image", 422));
    }

    const { image } = req.files;

    if (image.size > 1024 * 1024) {
      return next(new HttpError("Image size should be less than 1MB", 422));
    }

    // Generate unique filename
    const ext = path.extname(image.name);
    const fileName = path.basename(image.name, ext) + "-" + uuid() + ext;

    // Convert image buffer to readable stream
    const bufferStream = new Readable();
    bufferStream.push(image.data);
    bufferStream.push(null);

    // Upload image to Cloudinary
    const cloudinaryResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          public_id: `candidates/${fileName}`,
        },
        (error, result) => {
          if (error || !result) {
            return reject(new HttpError("Failed to upload image to Cloudinary", 500));
          }
          resolve(result);
        }
      );
      bufferStream.pipe(uploadStream);
    });

    if (!cloudinaryResult.secure_url) {
      return next(new HttpError("Failed to upload image to Cloudinary", 500));
    }

    // Create new candidate
    const newCandidate = new candidateModel({
      fullName,
      motto,
      image: cloudinaryResult.secure_url,
      election: currentElection,
    });

    // Get election and link candidate
    const election = await electionModel.findById(currentElection);
    if (!election) {
      return next(new HttpError("Election not found", 404));
    }

    // Start MongoDB transaction
    const sess = await mongoose.startSession();
    sess.startTransaction();
    try {
      await newCandidate.save({ session: sess });
      election.candidates.push(newCandidate._id);
      await election.save({ session: sess });
      await sess.commitTransaction();
      sess.endSession();

      res.status(201).json({
        message: "Candidate added successfully",
        candidate: newCandidate,
      });
    } catch (err) {
      await sess.abortTransaction();
      sess.endSession();
      return next(new HttpError("Transaction failed: " + err.message, 500));
    }

  } catch (error) {
    return next(
      error instanceof HttpError
        ? error
        : new HttpError(error.message || "Unknown error", 500)
    );
  }
};
// DELETE: /api/candidates/:id
// PROTECTED (only admin)
export const getCandidate = async (_req, res) => {
 try
 {
  const{id}= _req.params;
  const candidate = await candidateModel.findById(id)
  res.status(200).json(candidate);
 }catch (error) {
  return next(new HttpError(error));
 }
};

// REMOVE CANDIDATE FROM ELECTION
// POST: /api/candidates/:id
// PROTECTED (only admin)
export const removeCandidate = async (_req, res) => {
  try {
    if (!_req.user?.isAdmin) {
      return next(new HttpError("Only Admin can perform this action.", 403));
    }
    const { id } = _req.params;
    let currentCandidate = await candidateModel.findById(id).populate("election");
    if (!currentCandidate) {
      return next(new HttpError("candidate not delete", 404));
    } else {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await candidateModel.deleteOne({ _id: id }, { session: sess });
      currentCandidate.election.candidates.pull(currentCandidate._id);
      await currentCandidate.election.save({ session: sess });
      await sess.commitTransaction();
      sess.endSession();
      res.status(200).json({
        message: "Candidate removed successfully",
        candidate: currentCandidate,
      });
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

// UPDATE CANDIDATE IN ELECTION
// PATCH: /api/candidates
// PROTECTED (only admin)
export const voteCandidate = async (req, res, next) => {
  try {
    const { id: candidateId } = req.params;
    const { selectedElection } = req.body;
    const voterId = req.user?.id;

    console.log("💡 candidateId:", candidateId);
    console.log("💡 selectedElection:", selectedElection);
    console.log("💡 voterId:", voterId);

    // Validate ObjectIds
    if (!mongoose.isValidObjectId(candidateId)) {
      return next(new HttpError("Invalid candidate ID", 400));
    }
    if (!mongoose.isValidObjectId(selectedElection)) {
      return next(new HttpError("Invalid election ID", 400));
    }
    if (!mongoose.isValidObjectId(voterId)) {
      return next(new HttpError("Invalid voter ID", 400));
    }

    // Start DB session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // 1. Get candidate
    const candidate = await candidateModel.findById(candidateId).session(session);
    if (!candidate) {
      await session.abortTransaction();
      session.endSession();
      return next(new HttpError("Candidate not found", 404));
    }

    // 2. Get voter
    const voter = await voterModel.findById(voterId).session(session);
    if (!voter) {
      await session.abortTransaction();
      session.endSession();
      return next(new HttpError("Voter not found", 404));
    }

    // 3. Get election
    const election = await electionModel.findById(selectedElection).session(session);
    if (!election) {
      await session.abortTransaction();
      session.endSession();
      return next(new HttpError("Election not found", 404));
    }

    // 4. Prevent double voting
    if (voter.votedElections?.some((id) => id.toString() === election._id.toString())) {
      await session.abortTransaction();
      session.endSession();
      return next(new HttpError("You have already voted in this election", 400));
    }

    // 5. Update vote count
    candidate.voteCount = (candidate.voteCount || 0) + 1;
    await candidate.save({ session });

    // 6. Track voting - avoid duplicates
    election.voters = election.voters || [];
    if (!election.voters.some((id) => id.toString() === voter._id.toString())) {
      election.voters.push(voter._id);
    }

    voter.votedElections = voter.votedElections || [];
    voter.votedElections.push(election._id);

    await election.save({ session });
    await voter.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    console.error("Vote error:", error);
    if (error instanceof HttpError) {
      return next(error);
    }
    return next(new HttpError(error.message || "Internal server error", 500));
  }
};