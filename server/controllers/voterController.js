 import voterModel from "../models/voterModel.js";
 import HttpError from "../models/ErrorModel.js";
 import jwt from "jsonwebtoken";
 import bcrypt from "bcryptjs";
// Register new voter
//POST: /api/voters/register
//UNPROTECTED

export const registerVoter = async (req, res, next) => {
 try{
        
         const { fullName, email, password, confirmPassword } = req.body;
         if(!fullName || !email || !password || !confirmPassword) {
           return next( new HttpError("All fields are required", 400));
         }
         //make all emails lowercased
         const newEmail = email.toLowerCase();
         // Check if the voter already exists
          const emailExists = await voterModel.findOne({ email: newEmail });
         if (emailExists) {
           return next(new HttpError("Email already exists", 400));
          }
          //make sure password is at least 6 characters
         if (password.trim().length < 6) {
           return next(new HttpError("Password must be at least 6 characters", 400));
          }
          //make sure passswords match
          if (password !== confirmPassword) {
           return next(new HttpError("Passwords do not match", 400));
          }
          //hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
          //No user/voter  should be admin except for one with email
          let isAdmin = false;
          if (newEmail =="ashimpdl7@gmail.com") {
            isAdmin = true;
          }
          //save new voter to db
          const newVoter = await voterModel.create({
            fullName,
            email: newEmail,
            password: hashedPassword,
            isAdmin
          });
          res.status(201).json({ 
            message: `Voter registered successfully ${fullName}`,
            voter: {
              id: newVoter._id,
              fullName: newVoter.fullName,
              email: newVoter.email,
              isAdmin: newVoter.isAdmin
            }
          });
 
 }catch(error){
  next(new HttpError("Registration failed", 500));
 }
}
// // Login voter
// //POST: /api/voter/login
// //UNPROTECTED



//function  to generat JWT token

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d" // Token valid for 30 days
  });
  return token;
};





export const loginVoter = async (req, res, next) => {
  try {
    console.log("Incoming body:", req.body);
    const { email, password } = req.body;
    console.log("Login Input:", { email, password });
    if (!email || !password) {
      return next(new HttpError("Email and password are required", 422));
    }
    const voter = await voterModel.findOne({ email: email.toLowerCase() });
    if (!voter) {
      return next(new HttpError("Invalid credentials", 422));
    }
    console.log("Voter found in DB:", voter);
    const comparepass =  await bcrypt.compare(password, voter.password);
    console.log(" Compared Password",comparepass)
    if (!comparepass) {
      return next(new HttpError("Invalid credentials", 422));
    }
    const { _id: id, isAdmin, votedElection } = voter;
    const token = generateToken({ id, isAdmin, votedElection });
    res.status(200).json({
      message: "Login successful",
      token,
      voter: {
        id,
        fullName: voter.fullName,
        email: voter.email,
        isAdmin,
        votedElection,
       
      }
    });
  } catch (error) {
    next(new HttpError("Login failed", 422));
  }
};
// // Get voter
// //GET: /api/voter/:id
// //PROTECTED

export const getVoter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const voter = await voterModel.findById(id).select("-password");
    res.json(voter);
  } catch (error) {
    console.error("Error fetching voter:", error);
    next(new HttpError("Failed to get voter", 500));
  }
}
// // Update voter
