# Rift-Data

We are building this project for our latest year in engineering studies at ECE Paris. The goal of this project is to build an application which is easy to deploy and that can be sold to e-sports organisations to have some statistics and predictions about the different champions that we can find in League of Legends.

## Technologies used
  
To build this application we wanted to rely on NodeJS with the Electron Framework. That grant us the possibility to have a desktop app that will be easy to deploy.
As DBMS we choosed to use MongoDB as our data are going to be semi structured and as we want to do real-time data for the future.
Finally for the ML part, we will use Spark to do the machine learning for our app.
  

  
## The App

In this version you can find the demo version of the app, this demo is connected to a mongoDB Atlas cluster that only has 10% of our dataset.
The app is composed of 3 sections, Home, Charts and Roles.
As far as we are today, we implemented the Roles section. In this section, you can choose a role (Top, Jungle, Midlane, Adc or support) and the application will give you the best champion based on his winrate on 11k games.
We also implemented the charts section, which display some charts about our statistics.
We downloaded the mongodb-spark-connector but we didn't have the time to implement machine learning algorithms in this project.
We also give you through a docker container the acces to the db so you can create your own queries.

If you want to test the app, don't worry the queries are a bit long when you want to query for a role.

## Installation

### Install librairies

- Open a cmd/shell
- Install npm using one of the following method :
  . With homebrew "brew install npm" (only for mac or linux)
  . By downloading [Node.js](https://nodejs.org/en/download/)
 - Write : "npm install node"
 - Write : "npx @electron-forge/cli import " this will allow you to forge the app

### Forge App
To forge the app and be able to use it follow those steps :
- Download the Zip of the code or clone the repository
- Open the zip
- Open a shell in the folder
- Write : "npm run make"
- The executable of the app will be ../out/rift-data-electron-darwin-x64/rift-data-electron.app

You will now be able to run the app just by double-clicking in the executable.

## Docker
If you want to make specific queries, we grant you the acces to read our demo database.
You can use the official mongo image available on DockerHub [here](https://hub.docker.com/_/mongo)
Or you can :
docker pull mongo

Once it's done you can run your container using docker hub or :
docker run --name mongodb mongo

Then you will need to connect to the db (it's the last command you need to type don't worry)
docker exec -it containerid mongo "mongodb+srv://cluster0.zoomo.mongodb.net/Rift-Data" --username DockerUser
Then they will prompt the password : Rift-Data1
You're now connected to the db !
This user can only read the db.

## Spark
We did not have the time to implement machine learning with spark but we took care of the configuration. We used a DataBricks cluster that we linked with our MongoDB Atlas cluster using a mongodb-spark-connector.
![alt text](https://github.com/TatianaNoug/Rift-Data/blob/master/Images/DataBricks%20cluster.png "DataBricks Cluster")

We use the mongoDB spark connector : org.mongodb.spark:mongo-spark-connector_2.12:3.0.0. We found it in Maven.
![alt text](https://github.com/TatianaNoug/Rift-Data/blob/master/Images/Mongo%20Connector.png "Mongo Connector")


## The pros

Today, we have a desktop app. This demo desktop app is easy to deploy. It's cross-platform and easy to use.

## The cons
As the app is a desktop app and use a GUI, we can't deploy it using Docker, but we wanted to include Docker in this project so you will be able to query the demo part of our database using Docker.

## The Future
We also want to implement machine learning using spark.

We asked Riot to obtains an API so we can request specific APIs but we don't have any response now but we we will get one we will use 3 specific API calls to add more data in our database. We will crawl the data from at least all challenger matches.

## Difficulties faced
Through this project we face many difficulties.
The first one was to create a request that can return a winrate for a specific champion. As the document was composed of arrays of arrays we spent a little time on it.
That was the first desktop app that we built and it was quite a chellenge, we lost many hours trying things and understanding how it works.
Same for docker, we spent some hours to finally understand that we can't use Docker for a GUI app (That's pretty obvious but we didn't saw it at first). 
Finally, we ran out of time. We wanted to do a lot of things in this project, and we didn't know that we will face difficulties for litteraly every step. I think we underestimated the amount of work for this project so we are here with an unfinished project but we learnt a lot by facing those problems.
