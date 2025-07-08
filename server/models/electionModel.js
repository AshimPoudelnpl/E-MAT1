import { Schema, model, Types } from 'mongoose';
const electionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  candidates: [{
    type: Types.ObjectId,
    ref: 'Candidate',
    required: true,
    default: []
  }],
  voters: [{
    type: Types.ObjectId,
    ref: 'Voter',
    required: true,
    default: []
   
  }]
}, { timestamps: true });

export default model('Election', electionSchema);