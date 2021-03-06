const express = require('express');
const path = require('path');
const { BrowserWindow, TouchBarSlider } = require('electron');
const {MongoClient} = require('mongodb');
const ex = express();
var mongo = require('mongodb'); 
const { callbackify } = require('util');
const { triggerAsyncId } = require('async_hooks');
  
let rolesRouter = express.Router();

var listTriee = [];
var lane = "";
var role= "";
var win = 0;
var total = 0;
var number = 0;

class Champion{

  constructor(_name, _lane, _winrate, _games){
      this.name = _name;
      this.lane = _lane;
      this.winrate= _winrate;
      this.games = _games;
  }

}


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
        this.window = null
    })
  }
}


function printInfo(){
  document.getElementById("champ1Name").innerHTML = this.listTriee[0].name;
  document.getElementById("champ1Winrate").innerHTML = this.listTriee[0].winrate;
  document.getElementById("champ1Total").innerHTML = this.listTriee[0].games;
  
  document.getElementById("champ2Name").innerHTML = this.listTriee[1].name;
  document.getElementById("champ2Winrate").innerHTML = this.listTriee[1].winrate;
  document.getElementById("champ2Total").innerHTML = this.listTriee[1].games;
  
  document.getElementById("champ3Name").innerHTML = this.listTriee[2].name;
  document.getElementById("champ3Winrate").innerHTML = this.listTriee[2].winrate;
  document.getElementById("champ3Total").innerHTML = this.listTriee[2].games;
  
  document.getElementById("champ1WName").innerHTML = this.listTriee[this.listTriee.length-1].name;
  document.getElementById("champ1WWinrate").innerHTML = this.listTriee[this.listTriee.length-1].winrate;
  document.getElementById("champ1WTotal").innerHTML = this.listTriee[this.listTriee.length -1].games;

  document.getElementById("champ2WName").innerHTML = this.listTriee[this.listTriee.length -2].name;
  document.getElementById("champ2WWinrate").innerHTML = this.listTriee[this.listTriee.length -2].winrate;
  document.getElementById("champ2WTotal").innerHTML = this.listTriee[this.listTriee.length -2].games;
  
  document.getElementById("champ3WName").innerHTML = this.listTriee[this.listTriee.length -3].name;
  document.getElementById("champ3WWinrate").innerHTML = this.listTriee[this.listTriee.length -3].winrate;
  document.getElementById("champ3WTotal").innerHTML = this.listTriee[this.listTriee.length -3].games;
}


function calculateOne(champ){

  var MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://DockerUser:Rift-Data1@cluster0.zoomo.mongodb.net/Rift-Data?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const dbo = client.db("Rift-Data").collection("DS 2");
    const globalV = require('../assets/global.js');
      dbo.aggregate([{$match: {"participants" : {$elemMatch: {championId: champ, "timeline.lane": this.lane,"stats.win":false, "timeline.role": this.role }}}},{$count: "total"}])
      .toArray().then( t =>{
        if(t.length>0){
          this.total = t[0].total;
        }else this.total = 0;
    });
      var win;
      dbo.aggregate([{$match: {"participants" : {$elemMatch: {championId: champ, "stats.win":true, "timeline.lane": this.lane, "timeline.role": this.role }}}},{$count: "total"}])
      .toArray().then( w =>{
        if(w.length>0){
          this.win = w[0].total;
        }else this.win = 0;
        this.total = this.total +this.win;
        var winrate = 0;
        if(this.total==0){
          winrate =0;
        }else{
          winrate = (this.win /this.total)*100;
        }
          var temp = new Champion(champ, this.lane, winrate, this.total);
          if(typeof(temp) != "undefined"){
            this.listTriee.push(temp);
            this.listTriee.sort(function(a,b){return b.winrate-a.winrate});
          }
        

        if(listTriee.length>=144){
         this.printInfo();
        }
        
      });
    
      
    client.close();
    return;
  }); 
}



function calculateTop(k){
   calculate(k);
}

async function calculate(k){
  this.listTriee=[];
  const globalV = require('../assets/global.js');
  if(k=1){
      this.lane = "TOP";
      this.role = "SOLO";
    }else if(k=3){
      this.lane = "MIDDLE";
      this.role = "SOLO";
    }else if(k=2){
      this.lane = "JUNGLE";
      this.role = "NONE";
    }else if(k=4){
      this.lane = "BOTTOM";
      this.role = "DUO_CARRY";
    }else{
      this.lane = "BOTTOM";
      this.role = "DUO_SUPPORT";
    }
    this.number = 1;

      await globalV.listOfChampions.forEach(calculateOne);

    
};

function closeWin() {
  this.window.close();
}

module.exports = rolesRouter; 