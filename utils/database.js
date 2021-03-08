const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://Dimko:root@cluster0.xuwwp.mongodb.net/e_shop?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('DB connected');
      db = client.db(); //storing connection in var
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (db) {
    return db;
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
