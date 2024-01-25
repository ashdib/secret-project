//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// initialise express
const app = express();

//port number
const port = 3000;

// find the path of url in the folder
const __dirname = dirname(fileURLToPath(import.meta.url));

// path for html file
const indexHtml = __dirname + "/public/index.html";
const secretHtml = __dirname + "/public/secret.html";

//setup the middleware
app.use(bodyParser.urlencoded({ extended: true }));

//create a middleware to check the request if authroized or not
var authenticate = false;
//This will get through first before passing in
const checkPassword = (req, res, next) => {
  if (req.body.password === "ILoveProgramming") {
    authenticate = true;
    
  }
  next();
};
//use the middleware 
app.use(checkPassword);

app.get("/",(req, res) => {
    res.sendFile(indexHtml);
})
//get the data from index.html
app.post("/check", (req, res) => {
if(authenticate){
    res.sendFile(secretHtml)
}
else{
    res.sendFile(indexHtml);
}
});



//start server
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
