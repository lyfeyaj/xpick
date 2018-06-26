Xpick
=====

[![Build Status](https://travis-ci.org/lyfeyaj/xpick.svg?branch=master)](https://travis-ci.org/lyfeyaj/xpick)
[![npm version](https://badge.fury.io/js/xpick.svg)](https://badge.fury.io/js/xpick)
[![npm](https://img.shields.io/npm/dt/xpick.svg)]()
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/lyfeyaj/xpick/master/LICENSE.md)

Extremely powerful pick functionality

## Installation

```bash
npm install xpick

# or

yarn install xpick
```

## Usage

```javascript
const pick = require('xpick');

let object = {
  name: 'felix',
  gender: 'male',
  hobbies: [
    { name: 'pingpong', skilled: true }
  ],
  profile: {
    github: 'lyfeyaj',
    twitter: 'lyfeyaj'
  }
};

pick(object, ['name', 'gender']);
// => { name: 'felix', gender: 'male' }

pick(object, 'name');
// => { name: 'felix' }

pick(object, 'name gender profile');
// => { name: 'felix', gender: 'male', profile: { github: 'lyfeyaj', twitter: 'lyfeyaj' } }

pick(object, `
  name
  gender: sex
  profile { twitter }
  hobbies: sports { name }
`);
// => { name: 'felix', sex: 'male', profile: { twitter: 'lyfeyaj' }, sports: [{ name: 'pingpong' }] }
```

For full `xpick` syntax support, please check [stoc](https://github.com/lyfeyaj/stoc) for more information.

Enjoy !
