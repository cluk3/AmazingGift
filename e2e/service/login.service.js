'use strict';

exports.login = function (email, password) {
  element(by.model('user.email')).sendKeys(email);
    element(by.model('user.password')).sendKeys(password);
    return element(by.buttonText('Login')).click()
};