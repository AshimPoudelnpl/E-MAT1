import { Schema, model, Types } from 'mongoose';

const voterSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  votedElections: [{
    type: Types.ObjectId,
    ref: 'Election',
    default: []
  }],
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export default model('Voter', voterSchema);
