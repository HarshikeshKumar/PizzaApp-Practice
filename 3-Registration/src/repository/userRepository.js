import User from "../schema/userSchema.js";

async function findUserRepo(parameters) {
  try {
    const user = await User.findOne(parameters);
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function createUserRepo(userDetails) {
  try {
    const user = await User.create(userDetails);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export { findUserRepo, createUserRepo };
