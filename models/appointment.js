import { Schema, model, models } from "mongoose";

const AppointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // store as "HH:mm"
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending"
  },
  created_at: { type: Date, default: Date.now }
});

const Appointment = models.Appointment || model("Appointment", AppointmentSchema);
