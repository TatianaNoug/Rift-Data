const express = require('express');
const path = require('path');
const { BrowserWindow, TouchBarSlider } = require('electron');
const {MongoClient} = require('mongodb');
const ex = express();
const globalV = require('../assets/global.js');


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


function calculateTop(){
  console.log(globalV.listOfChampions.length);
}


function closeWin() {
  this.window.close();
}
