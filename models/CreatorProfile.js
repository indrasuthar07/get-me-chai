import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CreatorProfileSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  profileImage: { type: String },
  razorpayKeyId: { type: String },
  razorpaySecret: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.CreatorProfile || model('CreatorProfile', CreatorProfileSchema);