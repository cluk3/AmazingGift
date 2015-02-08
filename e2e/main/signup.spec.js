'use strict';

describe('Signup', function() {

  beforeEach(function() {
    browser.get('/signup');
  });

  it('should create a new user and redirect to home with the user logged in',
   function() {
    var logout = element(by.linkText('Logout'));
    var firstName = element(by.model('user.nameFirst'));
    var lastName = element(by.model('user.nameLast'));
    var email = element(by.model('user.email'));
    var password = element(by.model('user.password'));
    var confirmPsw = element(by.model('user.confirmpw'));
    var signup = element(by.buttonText('Sign up'));
    var fullname = element(by.binding('getFullname()'));

    firstName.sendKeys('Luca');
    lastName.sendKeys('Campli');
    email.sendKeys('luca@test.com');
    password.sendKeys('test');
    confirmPsw.sendKeys('test');

    signup.click()
    .then(function() {
      expect(browser.getLocationAbsUrl()).toMatch('/');
      expect(logout.isDisplayed()).toBeTruthy();
      expect(fullname.getText()).toMatch('Luca Campli');
    });
   });
});