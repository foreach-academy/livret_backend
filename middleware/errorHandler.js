const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errorsArray = err.errors || [err.message];
    res.status(errStatus).json({
      status: errStatus,
      errors: errorsArray  
    });
  };
  
  export default ErrorHandler;