const app = require('express')();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => res.send("Hi mom\n"));

app.listen(port, () => console.log(`Running on ${port}`));

/*   -------------------------     */

const { MongoClient } = require("mongodb");

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/demo-db";

const client = new MongoClient(mongodbUri);

client.connect(() =>  console.log(`Connected to mongo ${mongodbUri}`));

app.get('/users', async (req, res) => {
  const usersCollection = client.db().collection('users');
  const users = await usersCollection.find().toArray();

  res.send(users);
});
