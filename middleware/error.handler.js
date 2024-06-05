const { ValidationError } = require('sequelize')
function logError(error,req,res,next){
    console.log('logError');
    console.log('*********************************')
    console.log(error);
    next(error);
}


function errorHandler(error,req, res, next){
    console.log('errorHandler');
    console.log('*********************************')
    res.status(500).json({
        error: error.message,
        stack: error.stack
    })
}

function errorSqlHandler(error,req, res, next){
    if(error instanceof ValidationError){
        res.status(422).json({
            error: error.message,
            details: error.errors
        })
    }else{
        next(error);
    }
}

function boomErrorHandler(error,req, res, next){
    //validar que el error sea de tipo boom
    if (error.isBoom) {
      const { output } = error;
      res.status(output.statusCode).json(output.payload);

    }else{
      next(error);
    }

}




module.exports = {
    logError,
    errorHandler,
    errorSqlHandler,
    boomErrorHandler
}

