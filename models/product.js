const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);

// const getDB = require('../utils/database').getDB;
// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDB();
//     let dbOperation;
//     if (this._id) {
//       //update the product
//       dbOperation = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOperation = db.collection('products').insertOne(this);
//     }
//     return dbOperation
//       .then((result) => {
//         //console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDB();
//     return db
//       .collection('products')
//       .findOne({ _id: new mongodb.ObjectId(prodId) }) //here we have acceess to "_id: ObjectId('asdasdasdasd')"
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDB();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log('Deleted');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
