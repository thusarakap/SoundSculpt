const { addFormSubmissionListener } = require('../resources/scripts/register');

describe('addFormSubmissionListener', () => {
  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML =
      '<form id="signupForm">' +
      '  <input id="username" type="text" />' +
      '  <input id="email" type="email" />' +
      '  <input id="password" type="password" />' +
      '  <input id="confirmPassword" type="password" />' +
      '</form>';

    // Set mock user details
    document.getElementById("username").value = "testUsername";
    document.getElementById("email").value = "testEmail";
    document.getElementById("password").value = "testPassword";
    document.getElementById("confirmPassword").value = "testConfirmPassword";
  });

  it('should add form submission listener', () => {
    const form = document.getElementById("signupForm");
    form.addEventListener = jest.fn();

    addFormSubmissionListener();

    expect(form.addEventListener).toHaveBeenCalledWith("submit", expect.any(Function));
  });
});