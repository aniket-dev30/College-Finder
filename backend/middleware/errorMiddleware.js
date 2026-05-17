const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  const payload = {
    success: false,
    message,
  };

  if (process.env.NODE_ENV !== "production") {
    payload.error = err.stack;
  }

  if (err.name === "SyntaxError" && err.status === 400 && "body" in err) {
    payload.message = "Invalid JSON payload";
  }

  res.status(statusCode).json(payload);
};

module.exports = errorHandler;