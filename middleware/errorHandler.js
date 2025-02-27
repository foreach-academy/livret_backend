const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMessage = err.message || "Une erreur inconnue s'est produite";
    res.status(errStatus).json({
      status: errStatus,
      message: errMessage,
    });
  };
  
  export default ErrorHandler;