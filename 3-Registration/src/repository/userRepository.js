import User from "../schema/userSchema.js";

class UserRepository {
  async findUserRepo(parameters) {
    try {
      const user = await User.findOne(parameters);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async createUserRepo(userDetails) {
    try {
      const user = await User.create(userDetails);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserRepository;
