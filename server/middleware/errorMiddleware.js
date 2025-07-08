// Middleware for unsupported routes (404)
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);  // Pass error to errorHandler middleware
};

// Error handler middleware
export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  // If statusCode not set, default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message || "An unknown error occurred"
  });
};

export default { notFound, errorHandler };
