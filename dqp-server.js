
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const fileUpload = require('express-fileupload');

const config  = require("./config")

const app = express();

app.use(express.static(config.service.public));
app.use(cors())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : config.service.upload,
    limits: { 
    	fileSize: 1024 * 1024 * 1024 
    }
}));

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({
	limit: '50mb'
}));


app.all("*",  (req, res, next) => {  
    req.fullUrl = req.protocol + '://' + req.hostname + ":"+ config.service.port+req.originalUrl
    next()
})

require("./src/dpp-router").then( router => {
	app.post("/api", router)

	app.listen(config.service.port, () => {
	  console.log(`JACE-DPP-SERVICE  as "${config.service.name}" service starts on ${config.service.host}:${config.service.port}`);
	});	
})

