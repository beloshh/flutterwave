

module.exports= function(err, req, res, next) {

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) 
    {
     res.status(500);
     res.json({
         "message": "Invalid JSON payload passed.",
         "status": "error",
         "data": null
     })}
 
    var responseData;
 
    if (err.name === 'JsonSchemaValidation') {
        // Set a bad request http response status or whatever you want
        res.status(400);
 
        // Format the response body however you want
        responseData = {
           message: err.validations,  // All of your validation information
           status: 'error',
           data: null,
        };
 
        // Take into account the content type if your app serves various content types
        if (req.xhr || req.get('Content-Type') === 'application/json') {
            res.json(responseData);
        } else {
            res.render('badrequestTemplate', responseData);
        }
    } else {
        // pass error to next error middleware handler
        next(err);
    }
 }