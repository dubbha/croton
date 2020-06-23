const app = require('./bin/app');
const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

app.on('close', () => {
  require('./emptyBin');
});
