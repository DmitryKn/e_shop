const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://Dimko:root@cluster0.xuwwp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('DB connected');
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
