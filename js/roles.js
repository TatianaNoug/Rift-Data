const express = require('express');
const path = require('path');
const { BrowserWindow } = require('electron');
const {MongoClient} = require('mongodb');
const  assert = require('assert')
let rolesRouter = express.Router();

<<<<<<< HEAD
//var MongoClient = require('mongodb').MongoClient
  //, assert = require('assert');

// Connection URL
//var urlMongo = 'mongodb://localhost:27017/Rift-DataLocal';
// Use connect method to connect to the Server
//MongoClient.connect(urlMongo, function(err, db) {
  //assert.strictEqual(null, err);
  //console.log("Connected correctly to server ");
  //const findResult = await Big.find({
    //participants.championId: "Vi",
  //});
  //db.close();
//});
=======
>>>>>>> ce644f3488bc95980d385aaacd38125766dabf8e

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

async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
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

module.exports = rolesRouter;