const app = require('express')();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => res.send("Hi mom\n"));

app.listen(port, () => console.log(`Running on ${port}`));
