const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? res.statusCode : 500;
  return res.status(statusCode).json({ message: err.message });
};

module.exports = errorHandler;
