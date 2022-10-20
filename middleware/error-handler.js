const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({msg: err.message, status: err.status});
}

module.exports = errorHandlerMiddleware;