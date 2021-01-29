var express = require('express');
var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');
var error = require('./middleware/error')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var ruleSchema = {  "id": '/Rule',  type: 'object', 
 properties: {    "field": { type: 'string' },  
                  "condition": {  type: 'string',  "enum": ["eq", "neq", "gt", "gte", "contains"] },   
                  "condition_value" : { type: 'integer' }  }, 
                  required: ['field', 'condition', 'condition_value']};


var dataSchema = {  id: '/Data',  type: ['string','object','array'],
                  properties: { }};

var itemSchema = {  id: '/Item',  type: 'object',
  properties: {     
                   rule: { $ref: '/Rule' }, 
                   data: { $ref: '/Data' },
                }, 
                   required: ['rule', 'data']};

 app.get('/', (req, res, next) => {
  const message = 'My Rule-Validation API'
  const status = "success"
  const data = {  name: "Badanga Ishak",
                 github: "@beloshh",
                 email: "badangabello@gmail.com",
                 mobile: "08053543093",
                 twitter: "@beloshh" }
         
   res.json({  message, status, data })
                 })

app.post('/validate-rule', [error, validate({body: itemSchema}, [ruleSchema, dataSchema])], function(req, res) {
   // application code
 
const message = `field ${req.body.rule.field} successfully validated`
const status = "success"
const data = {  
   "validation": {
      "error": false,
      "field": `${req.body.rule.field}`,
      "field_value": `${req.body.rule.condition_value}`,
      "condition": `${req.body.rule.condition}`,
      "condition_value": `${req.body.rule.condition_value}`,
 }}
   res.status(200).send({message, status, data})
});


port = process.env.PORT || 8080

app.listen(port, function(){
   console.log('app is running')
});