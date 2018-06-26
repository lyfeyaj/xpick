'use strict';

const pick = require('lodash.pick');
const isString = require('lodash.isstring');
const isPlainObject = require('lodash.isplainobject');
const forEach = require('lodash.foreach');
const stoc = require('stoc');

// pick according to stoc parsed fields
function pickByFields(obj, fields) {
  // handle undefine or null
  if (obj == null) return obj;

  if (!fields) return {};

  // handle array
  if (Array.isArray(obj)) {
    return obj.map(function(val) {
      return pickByFields(val, fields);
    });
  }

  let _obj = Object.create(null);
  let ignoreFields = [];

  // handle plain object
  forEach(fields, function(inner, field) {
    if (!obj.hasOwnProperty(field)) return;

    // pick field
    if (inner === 1) _obj[field] = obj[field];

    // field rename then pick
    if (isString(inner)) {
      delete _obj[inner];

      // field rename with inner object
      if (fields[inner] && isPlainObject(fields[inner])) {
        _obj[inner] = pickByFields(obj[field], fields[inner]);

        // add field to ignore list
        ignoreFields.push(inner);
      } else {
        _obj[inner] = obj[field];
      }
    }

    if (isPlainObject(inner) && !~ignoreFields.indexOf(field)) {
      _obj[field] = pickByFields(obj[field], inner);
    }
  });

  return _obj;
}

function xpick(obj, paths) {
  if (!paths || !obj) return {};

  if (!isString(paths)) return pick(obj, paths);

  return pickByFields(obj, stoc(paths)) || {};
}

module.exports = xpick;
