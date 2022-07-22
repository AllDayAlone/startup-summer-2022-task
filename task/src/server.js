const app = require('express')();
const port = process.env.PORT || 4001;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => res.send("Hi mom\n"));

app.listen(port, () => console.log(`Running on ${port}`));

/*   -------------------------     */

const { MongoClient } = require("mongodb");

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27018/demo-db";

const client = new MongoClient(mongodbUri);

client.connect(() =>  console.log(`Connected to mongo ${mongodbUri}`));

app.get('/users', async (req, res) => {
  const usersCollection = client.db().collection('users');
  const users = await usersCollection.find().toArray();

  res.send(users);
});

/*   -------------------------     */

const { createClient } = require('redis');

const redisUri = process.env.REDIS_URI || "redis://localhost:6378";

const redisClient = createClient({ url: redisUri });

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

app.get('/counter', async (req, res) => {
  const counter = Number(await redisClient.get('counter')) || 0;
  await redisClient.set('counter', counter + 1);

  res.send({ counter });
});