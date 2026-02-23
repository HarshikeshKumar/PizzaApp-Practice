import User from "../schema/userSchema.js";

class UserRepository {
  async findUser(parameters) {
    try {
      const response = await User.findOne(parameters);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(userDetails) {
    try {
      const response = await User.create(userDetails);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserRepository;
