import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email should be Provided"],
      unique: [true, "Email is already in use"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password should be Provided"],
      minlength: [6, "Password must be atleast 5 characters long"],
    },
    firstName: {
      type: String,
      required: [true, "First name should be provided"],
      trim: true,
      minlength: [5, "First name must be atleast 5 characters long"],
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name should be Provided"],
      trim: true,
      minlength: [5, "Last name must be atleast 5 character long"],
      lowercase: true,
    },
    mobileNumber: {
      type: String,
      trim: true,
      unique: [true, "Phone Number is already in use"],
      required: [true, "Phone Number Should be Provided"],
      minlength: [10, "Phone number should be 10 characters long"],
      maxlength: [10, "Phone number should be 10 characters"],
    },
  },
  { timestamps: true },
);

// App bcrypt for hashing user password
userSchema.pre("save", async function () {
  // console.log("Executing Pre save hook");
  // console.log(this);
  // Password hashing..
  const hashedPassword = await bcrypt.hash(this.password, 10);
  // console.log("hashedPassword: ", hashedPassword);
  this.password = hashedPassword;
  // console.log("Hashing ke baad user details:", this);
  // console.log("Exitting pre save hook");
});

const User = mongoose.model("User", userSchema);

export default User;
