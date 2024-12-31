const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? res.statusCode : 500;
  console.error(err.stack); // Log the error stack for debugging this line from GPT
  res.status(statusCode).json({ message: err.message });
  next();
};

module.exports = errorHandler;
