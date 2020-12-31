const express = require('express');
const { app, Menu, BrowserWindow, Main } = require('electron')
const path = require('path')
const url = require('url')
const ex = express();
var globalV = require('../assets/global.js');



function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, frame:false,movable: true, webPreferences: {
    nodeIntegration: true
  }})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../pages/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


function closeWin() {
  this.window.close();
}
