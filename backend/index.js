//import express library
const express = require("express");
//init express app
const app = express();
const port = 5000;  

//Imports
//for db connection, to mongo
const mongoose = require("mongoose");
//import cors libaray
const cors = require('cors');
//require body parser to read in content from body of request
const bodyParser = require("body-parser");

// core node module to deal with file path
const path = require('path');

//middlewear
//enable cors for cross site resource sharing, harmless as api runs locally, only accessd from local running resources
app.use(cors());
//parse the response as json
app.use(bodyParser.json());

const dishes = [
    {
        recipeName: "Shawarma"
    },{
        recipeName: "Biryani"
    },
    {
        recipeName: "Turkish Kebab" 
    }
  ];

//GET on /dishes will result in getting all dishes as response
app.get('/dishes', (req, res) => {
    res.status(200).send(JSON.stringify(dishes));    
});

//POST on /inventory with the correct body format, will result in a newly created
//inventory item, that is returned back as response
app.post("/dishes", async (req, res)=>{

    let obj = dishes.find(dish => dish.recipeName === req.body.recipeName);
    const index = dishes.indexOf(obj);

    try{
        if(index < 0){
            dishes.push({recipeName: req.body.recipeName});
            res.status(201).json({message: "Successfully created dish!"});
        }
        else res.status(400).json({message: "Dish already exists."});
    }
    catch(err){
        res.status(500).json({message: "Internal server error:"+err});
    }
});


//DELETE removes the specific inventory item
app.delete("/dishes", async (req, res)=>{

    let obj = dishes.find(dish => dish.recipeName === req.body.recipeName);
    const index = dishes.indexOf(obj);

    try{
        if (index > -1) {
            dishes.splice(index, 1); // 2nd parameter means remove one item only
        }
        else res.status(400).json({message: "A recipe name that doesnt exist was provided."});

        res.status(202).json({message: "Successfully deleted dish!"});
    }
    catch(err){
        res.status(500).json({message: "Internal server error:"+err});
    }

})

//get requests to the root ("/") will route here
app.get('/', (req, res) => { 
    res.status(200).send("Welcome to the Dish server.");    
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});