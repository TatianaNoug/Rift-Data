const express = require('express');
const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const ex = express();
const {MongoClient} = require('mongodb');
const  assert = require('assert')

let mainWindow
let charts = require('./charts');
let roles = require('./roles');

/*
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url2 = 'mongodb://localhost:27017/Rift-DataLocal';
// Use connect method to connect to the Server
MongoClient.connect(url2, function(err, db) {
  assert.strictEqual(null, err);
 // console.log("Connected correctly to server WXSDRCTFVGYBHNJ??JINHUBGYVFTCDXRDCFTVGYBHUNIJ?");
  db.close();
});
*/


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, frame:false})
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../pages/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // Open the DevTools.
   //mainWindow.webContents.openDevTools()
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

async function main(){
  
  const uri = "mongodb://localhost:27017/Rift-DataLocal";

  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);



function closeWin() {
  this.window.close();
}

ex.use('/v1/charts', charts);
ex.use('/v1/roles',roles);