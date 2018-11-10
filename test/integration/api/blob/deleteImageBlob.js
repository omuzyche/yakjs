'use strict';

const httpDelete = require('../../httpDelete');

httpDelete('http://localhost:8790/v1/blob/test/favicon.png')
    .then(response => {
        console.log(response);
    })
    .catch(console.error);

