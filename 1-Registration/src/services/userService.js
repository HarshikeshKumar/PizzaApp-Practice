class UserService {
  constructor(_userRepository) {
    this.userRepository = _userRepository;
  }

  async registerUser(userDetails) {
    // It will create a brand new user in db
    // 1. We need to check if the user with this email and mobileNumber already exists or not
    const user = await this.userRepository.findUser({
      email: userDetails.email,
      mobileNumber: userDetails.mobileNumber,
    });
    // If we found user
    if (user) {
      throw {
        reason: "User with this email and mobile Number already exists",
        statusCode: 400, // Bad Request
      };
    }
    // 2. If not then create the user in database
    const newUser = await this.userRepository.createUser({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
      mobileNumber: userDetails.mobileNumber,
    });
    // Agar kisi wajah se ham user create nhi krr paye
    if (!newUser) {
      throw {
        reason: "Something went wrong, cannot created user",
        statusCode: 500, // Internal Server Error
      };
    }
    // 3. Return the details of create user
    return newUser;
  }
}

export default UserService;
