const config = require('./lambda-config');

require('claudia')
  .create(config)
  .then((res) => {
    console.log('Deploy successful \n', res);
  })
  .catch((error) => {
    console.error('Deploy failed \n', error);
  });
