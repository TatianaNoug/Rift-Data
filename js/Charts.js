const express = require('express');
const path = require('path');
const { BrowserWindow } = require('electron');

let chartsRouter = express.Router();

class Charts {
  constructor() {
    let htmlPath = 'file://' + path.join(__dirname, '..') + '../pages/charts.html'

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


function closeWin() {
  this.window.close();
}

module.exports = chartsRouter;