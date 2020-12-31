const express = require('express');
const path = require('path');
const { BrowserWindow } = require('electron');

class MainWindow {
  constructor() {
    let htmlPath = 'file://' + path.join(__dirname, '..') + '../pages/index.html'

    this.window = new BrowserWindow({
      show: false,
      width: 400,
      height: 400,
      frame: false,
      minWidth: 800,
      minHeight: 600,
      backgroundColor: '#E4ECEF',
      nodeIntegration: true,
    })

    this.window.loadURL(htmlPath);

    this.window.on('closed', function () {
        this.window = null
    })
  }
}

function closeWin() {
  this.window.close();
}

module.exports = MainWindow;