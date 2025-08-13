import { Schema, model, models } from "mongoose";

const HospitalSchema = new Schema({
  name: { type: String, required: true, maxLength: 255 },
  address: { type: String, required: true },
  pincode: { type: String, maxLength: 10, required: true },
  city: { type: String, maxLength: 100, required: true },
  state: { type: String, maxLength: 100, required: true },
  phone_number: { type: String, maxLength: 15, required: true },
  rating: { type: Number, min: 0, max: 5 },
  image: { type: String } // store image URL or path
});

const Hospital= models.Hospital || model("Hospital", HospitalSchema);

export default Hospital;