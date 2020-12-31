const express = require('express');
const path = require('path');
const { BrowserWindow, TouchBarSlider } = require('electron');
const {MongoClient} = require('mongodb');
const ex = express();
const Champion = require('./champion.js');
var mongo = require('mongodb'); 
const { callbackify } = require('util');
  
let rolesRouter = express.Router();

var listTriee = [];
var lane = "";

class Roles {
  constructor() {
    let htmlPath = 'file://' + path.join(__dirname, '..') + '../pages/roles.html'

    this.window = new BrowserWindow({
      show: false,
      width: 400,
      height: 400,
      frame: false,
      minWidth: 800,
      minHeight: 600,
      backgroundColor: '#E4ECEF',
      movable: true,
      webPreferences: {
        nodeIntegration: true
      }
    })

    this.window.loadURL(htmlPath);

    this.window.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        this.window = null
    })
  }
}
/*
async function main(k){
  
const globalV = require('../assets/global.js');
  
  const uri = "mongodb://localhost:27017/Rift-DataLocal";

  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      calculate(client, k)

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}
*/
function calculateOne(champ){

  var MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://DockerUser:Rift-Data1@cluster0.zoomo.mongodb.net/Rift-Data?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const dbo = client.db("Rift-Data");
    const globalV = require('../assets/global.js');
      var total;
      dbo.collection("DS 2").count({"participants.championId": champ}).then(function(tot){
        total = tot;
        //console.log(total);
      }
        //toArray(function(err, result){
        );
      var win;
      dbo.collection("DS 2").aggregate([{$match: {"participants" : {$elemMatch: {championId: champ, "stats.win":true}}}},{$count: "total"}]).then(function(w){
        win = w;
      })
      });
    
      var winrate = win /total*100;

      
      var temp = new Champion(globalV.listOfChampions[i], "top", winrate);


      if(this.listTriee===""){
        this.listTriee.push(temp);
      }else if(temp.winrate>this.listTriee[0].winrate){
        var tempList = this.listTriee;
        this.listTriee = [temp];
        this.listTriee.push(tempList);
      }else{
        this.listTriee.push(temp);
      }
      
    client.close();

  }); 
}

function calculate(k){
  const globalV = require('../assets/global.js');
  if(k= 1 ){
      this.lane = "top";
    }else{
      this.lane = "mid";
    }

  //var dbo = client.db("Rift-DataLocal");
  /*client.db().admin().listDatabases().then(function(dbList){
    console.log(dbList);
    //callback(dbList);
  })*/
  globalV.listOfChampions.forEach(calculateOne);
  //console.log(globalV.listOfChampions.length);
  //for(var i = 0; i< globalV.listOfChampions.lenght; i++){
    
    
  //}

  console.log(listTriee);
  return[listTriee[0], listTriee[1], listTriee[2]]

  /*
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });*/

    
  
};

//main().catch(console.error);



function calculateTop(k){
   calculate(k);
  //console.log(globalV.listOfChampions);
}


function closeWin() {
  this.window.close();
}

module.exports = rolesRouter; 