//Libraries
const express = require('express');
const multer  = require('multer');

//Setup defaults for script
const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 80 //Default port to http server

//The * in app.* needs to match the method type of the request
app.post(
    '/', 
    upload.array('file'), //Should be the name of the file in the response
    (request, response) => {
        //console.log(request.files);       //request.files is the files uploaded with the request
        //console.log(request.body.choice); //request.body is only non-file data from the request
        response
            .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
            .json({message: 'Got a POST request.'});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})