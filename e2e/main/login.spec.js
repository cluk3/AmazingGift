'use strict';

describe('Log in', function() {
  var login = require('../service/login.service').login;
  var logout = element(by.linkText('Logout'));

  beforeEach(function() {
    browser.get('/login');
  })

  afterEach(function() {
    logout.click();
  })


  it('should login an existing user', function () {

    login('test@test.com', 'test')
    .then(function() {
      expect(browser.getLocationAbsUrl()).toMatch('/');
      expect(logout.isDisplayed()).toBeTruthy();
    });
  });
});