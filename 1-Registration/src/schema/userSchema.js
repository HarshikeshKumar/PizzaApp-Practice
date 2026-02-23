import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    minlength: [5, "First Name should be atleast 5 characters long"],
    maxlength: [20, "First Name Should be equal or less 20 characters"],
    required: [true, "First Name shpuld be provided"],
    lowercase: true,
  },

  lastName: {
    type: String,
    trim: true,
    minlength: [5, "Last Name should be atleast 5 characters long"],
    maxlength: [20, "Last Name equal or less than 20 characters"],
    required: [true, "Last Name should be Provided"],
    lowercase: true,
  },

  email: {
    type: String,
    required: [true, "Email should be provided"],
    trim: true,
    unique: [true, "Email are already in use"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    lowercase: true,
  },

  password: {
    type: String,
    trim: true,
    minlength: [6, "Password should be atleast 6 characters long"],
    maxlength: [15, "Password should be equal to and less than 15 characters"],
    required: [true, "Password should be Provided"],
  },

  mobileNumber: {
    type: String,
    required: [true, "Phone Number Should be Provided"],
    unique: [true, "Phone Number Should be Unique"],
    minlength: [10, "Phone Number should be 10 characters"],
    maxlength: [10, "Phone Number should be 10 Characters"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
