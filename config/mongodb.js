const MongoClient = require('mongodb').MongoClient;


module.exports = function() {
    const URI = process.env.MONGODB_APP_URI;
    const DB_NAME = process.env.MONGODB_DB_NAME;
    
    const client = new MongoClient(URI, { useNewUrlParser: true });
    const db = client.db(DB_NAME);
    
    return db;
}