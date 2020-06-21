const config = require('./lambda-config');
const fs = require('fs-extra');

require('claudia')
  .update(config)
  .then((res) => {
    console.log('Update successful \n', res);
  })
  .catch((error) => {
    console.error('Update failed \n', error);
  });
