import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true, required: true },
  address: { type: String },
  phone_number: { type: String, maxLength: 15 },
  state: { type: String, maxLength: 100 },
  city: { type: String, maxLength: 100 },
  image: { type: String },
  pincode: { type: String, maxLength: 10 },
  blood_group: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"]
  },
  age: { type: Number, min: 0 },
  gender: { type: String, enum: ["Male", "Female", "Non-Binary"] }
});

const User= models.User || model("User", UserSchema);

export default User;