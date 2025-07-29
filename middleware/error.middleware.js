const errorMiddleware = (err, req, res, next) => {
    try {
        let error={ ...err};
        error.message = err.message;
        console.error(err);
       
        if(err.name == 'CastError'){
            const message = `Resource not found`;

            error=new Error(message);
            error.statuscode=404
        }
        if(err.code === 11000){
            const message = `Duplicate field value entered`;
            error=new Error(message);
            error.statuscode=400
        }
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error=new Error(message.join(', '));
            error.statuscode=400
        }
        res.status(err.statuscode || 500).json({
            success: false,
            error: error.message || 'Server Error',
        });
        
    }catch (error) {
        next(error);
    }
}
export default errorMiddleware;
//create a subscription->middleware(check for renewal date and send email if subscription is about to expire)
