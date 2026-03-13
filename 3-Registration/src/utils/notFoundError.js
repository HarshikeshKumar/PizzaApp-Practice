import AppError from "./appError.js";

class NotFoundError extends AppError {
  constructor(properties, resource) {
    // properties: --> []
    let notFoundProperties = "";
    properties.forEach((property) => (notFoundProperties += `${property}, `));

    super(
      `Not able to find properties: ${notFoundProperties} for the resource ${resource}`,
      404,
    );
  }
}

export default NotFoundError;
