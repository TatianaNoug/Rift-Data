const express = require('express');
const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const ex = express();
const {MongoClient} = require('mongodb');
const  assert = require('assert');

class Champion{

    constructor(_name, _lane, _winrate){
        this.name = _name;
        this.lane = _lane;
        this.winrate= _winrate;
    }

}

module.exports = {Champion};
//    constructor(){

  //  }
/*
    setName(let _name){
        this.name = _name;
    }

    setWinRate(let _name){
        this.name = _name;
    }

    setLane(let _name){
        this.name = _name;
    }
*/

