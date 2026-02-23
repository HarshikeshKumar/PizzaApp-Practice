class UserService {
  constructor(_userRepository) {
    this.userRepository = _userRepository;
  }

  async registerUser(userDetails) {
    // 1. We need to check user is already exists or not
    const user = await this.userRepository.findUser({
      email: userDetails.email,
      mobileNumber: userDetails.mobileNumber,
    });
    // Agar Uaser mil gaya
    if (user) {
      throw {
        reason: "User are already exists with this email and phone number",
        statusCode: 400, // Bad-Request
      };
    }

    // 2. If not exists, Then create user in database
    const newUser = await this.userRepository.createUser({
      email: userDetails.email,
      password: userDetails.password,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      mobileNumber: userDetails.mobileNumber,
    });
    // Agar user create nhi krr paye
    if (!newUser) {
      throw {
        reason: "Something Went wrong, Cannot Created user",
        statusCode: 500, //Internal-Server-Error
      };
    }

    // 3. Return created user details
    return newUser;
  }
}

export default UserService;
