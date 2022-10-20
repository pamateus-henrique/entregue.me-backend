// writing an async wrapper to avoid use try/catch in every single controller, in case the controller throw an error, we will pass it to the express 
// errror handler built in function calling next(), but in this case, we have our own error handler 


const asyncWrapper = (fn) => {
    return async (req,res,next) => {
        try {
            await fn(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = asyncWrapper;