const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Mock Firebase methods
const firebase = {
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({
      user: { uid: 'testUid' },
    })),
  })),
  database: jest.fn(() => ({
    ref: jest.fn(() => ({
      once: jest.fn(() => Promise.resolve({
        exists: jest.fn(() => true),
        val: jest.fn(() => ({
          dBValues: '1,2,3',
          speakerType: 'testSpeakerType',
        })),
      })),
    })),
  })),
};

// Mock fs.writeFile method
jest.mock('fs', () => ({
  writeFile: jest.fn((path, data, callback) => callback(null)),
}));

// Mock location object
global.location = {
  replace: jest.fn(),
};

describe('login', () => {
  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML =
      '<form id="loginForm">' +
      '  <input id="email" type="email" />' +
      '  <input id="password" type="password" />' +
      '</form>';

    // Set mock user details
    document.getElementById("email").value = "testEmail";
    document.getElementById("password").value = "testPassword";

    // Import the login.js file
    require('../resources/scripts/login');
  });

  describe('login', () => {
    beforeEach(() => {
      // Set up our document body
      document.body.innerHTML =
        '<form id="loginForm">' +
        '  <input id="email" type="email" />' +
        '  <input id="password" type="password" />' +
        '</form>';
  
      // Set mock user details
      document.getElementById("email").value = "testEmail";
      document.getElementById("password").value = "testPassword";
  
      // Import the login.js file
      require('../resources/scripts/login');
    });
  
    test('fills in the email and password fields', () => {
      expect(document.getElementById("email").value).toBe("testEmail");
      expect(document.getElementById("password").value).toBe("testPassword");
    });
  });
});