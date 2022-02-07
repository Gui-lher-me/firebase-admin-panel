const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://frontly-acb60-default-rtdb.firebaseio.com',
});

const db = admin.firestore();

const app = express();

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/tables', (req, res, next) => {
  const loadedTables = [];
  db.listCollections()
    .then((querySnapshot) => {
      querySnapshot.forEach((snapshot) => {
        loadedTables.push(snapshot['_queryOptions'].collectionId); // LIST OF ALL COLLECTIONS
      });
      res.json(loadedTables);
    })
    .catch((error) => console.error(error));
});

const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
