const express = require('express');
const path = require('path');
const { BrowserWindow, TouchBarSlider } = require('electron');
const {MongoClient} = require('mongodb');
const ex = express();
const Champion = require('./champion.js');
var mongo = require('mongodb'); 
  
let rolesRouter = express.Router();

var listTriee = [];

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
function calculate(k){

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  const globalV = require('../assets/global.js');
  var dbo = client.db("Rift-DataLocal");
  console.log(globalV.listOfChampions.length);
  for(var i = 0; i< globalV.listOfChampions.lenght; i++){
    console.log("in for")
    var total;
    db.collection("Big").count({"participants.championId": globalV.listOfChampions[i]}).toArray(function(err, result){
      if(err) throw err;
      console.log(result);
      console.log("in");
      total = result;
    });
    console.log("out");
    var win;
    dbo.collection("Big").aggregate([{$match: {"participants" : {$elemMatch: {championId: globalV.listOfChampions[i], "stats.win":true}}}},{$count: "total"}]).toArray(function(err, result){
      if(err) throw err;
      console.log(result);
      win = result;
    });
  
    var winrate = win /total*100;

    var lane = k;
    if(k= 1 ){
      lane = "top";
    }
    var temp = new Champion(globalV.listOfChampions[i], "top", winrate);


    if(listTriee===""){
      listTriee.push(temp);
    }else if(temp.winrate>listTriee[0].winrate){
      var tempList = listTriee;
      listTriee = [temp];
      listTriee.push(tempList);
    }else{
      listTriee.push(temp);
    }
    
  }

  console.log(listTriee);
  return[listTriee[0], listTriee[1], listTriee[2]]

  /*
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });*/

}); 
    
  
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