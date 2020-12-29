const express = require('express');
const path = require('path');
const { BrowserWindow } = require('electron');
const {MongoClient} = require('mongodb');
const  assert = require('assert')
let rolesRouter = express.Router();

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
module.exports = rolesRouter;