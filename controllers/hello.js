'use strict';

var response = require('../res');

exports.index = function(res) {
    response.ok("You are one curious monkey!", res)
};