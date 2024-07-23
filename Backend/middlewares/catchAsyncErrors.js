// catchAsyncErros = (func) => {
//   return (req, res, next) => {
//     Promise.resolve(func(req, res, next)).catch(next);
//   };
// };
catchAsyncErrors = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { catchAsyncErrors };