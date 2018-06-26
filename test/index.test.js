'use strict';

const chai = require('chai');
const expect = chai.expect;
const xpick = require('../');

const object = {
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

describe('xpick', function() {
  it('should be able to pick by array properties', function() {
    expect(xpick(object, 'name gender')).to.deep.eq({ name: 'felix', gender: 'male' });
  });

  it('should be able to pick by property', function() {
    expect(xpick(object, 'name')).to.deep.eq({ name: 'felix' });
  });

  it('should be able to pick by stoc string', function() {
    expect(xpick(object, 'name gender profile')).to.deep.eq({
      name: 'felix',
      gender: 'male',
      profile: {
        github: 'lyfeyaj',
        twitter: 'lyfeyaj'
      }
    });

    expect(xpick(object, `
      name
      gender: sex
      profile { twitter }
      hobbies: sports { name }
    `)).to.deep.eq({
      name: 'felix',
      sex: 'male',
      profile: {
        twitter: 'lyfeyaj'
      },
      sports: [
        { name: 'pingpong' }
      ]
    });
  });
});
