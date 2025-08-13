// models/Doctor.js
import { Schema, model, models } from "mongoose";

const DoctorSchema = new Schema({
  name: { type: String, required: true, maxLength: 255 },
  specialization: { type: String, required: true, maxLength: 255 },
  experience: { type: Number, min: 0 },
  qualification: { type: String },
  about: { type: String },
  image: { type: String }, // URL or file path
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  available_days: { type: [String] }, // e.g. ["Monday", "Tuesday"]
  available_start_time: { type: String }, // store as "HH:mm"
  available_end_time: { type: String },
  slot_duration: { type: Number, min: 1 }, // minutes
  fees: { type: Number, min: 0 }
});

const Doctor= models.Doctor || model("Doctor", DoctorSchema);

export default Doctor;
