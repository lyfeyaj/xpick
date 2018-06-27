'use strict';

const pick = require('lodash.pick');
const isString = require('lodash.isstring');
const isPlainObject = require('lodash.isplainobject');
const forEach = require('lodash.foreach');
const stoc = require('stoc');

// Pick according to stoc parsed fields
function pickByFields(obj, fields) {
  // Handle undefine or null
  if (obj == null) return obj;

  let _obj = Object.create(null);

  if (!fields) return _obj;

  // Handle array
  if (Array.isArray(obj)) return obj.map(v => pickByFields(v, fields));

  let ignoreFields = [];

  // Handle plain object
  forEach(fields, function(inner, field) {
    if (!obj.hasOwnProperty(field)) return;

    // pick field
    if (inner === 1) {
      _obj[field] = obj[field];
    }
    // field rename then pick
    else if (isString(inner)) {
      delete _obj[inner];

      // field rename with inner object
      if (fields[inner] && isPlainObject(fields[inner])) {
        _obj[inner] = pickByFields(obj[field], fields[inner]);

        // add field to ignore list
        ignoreFields.push(inner);
      } else {
        _obj[inner] = obj[field];
      }
    } else if (isPlainObject(inner) && !~ignoreFields.indexOf(field)) {
      _obj[field] = pickByFields(obj[field], inner);
    }
  });

  return _obj;
}

// Main function
function xpick(obj, paths) {
  let _obj = Object.create(null);

  if (!paths || !obj) return _obj;

  if (!isString(paths)) return pick(obj, paths);

  return pickByFields(obj, stoc(paths)) || _obj;
}

module.exports = xpick;
