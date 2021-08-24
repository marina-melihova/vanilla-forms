import modal from './modal';

// const urlReg = 'https://api.investnix.com/v1/user/signup';
// const urlLogin = 'https://api.investnix.com/v1/user/login';
// const bearer_token = 'Kjdijoij{oq123!kdlsOp';
// const bearer = 'Bearer ' + bearer_token;

const loginMarkUp = function () {
  return `
      <h4>Login</h4>
      <form name="login" class="form">
        <div>
          <label for="email" class="form__label">Email</label>
          <input type="email" name="email" class="authFormEmail" required placeholder=" " />
          <div class="helper-text-div"></div>
        </div>
        <div>
          <label for="password" class="form__label">Password</label>
          <input type="password" name="password" autocomplete="on" class="authFormPassword" required placeholder=" " />
          <div class="helper-text-div"></div>
        </div>
        <button type="submit" class="btn__sign--in" data-signin="sign">Login</button>
      </form>
  `;
};

const onLogin = (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  console.log(data);
  /*
  const testData = new FormData();
  testData.append('email', 'user@test.me');
  testData.append('password', 'qweasd123');
  fetch(urlLogin, {
    method: 'POST',
    headers: { Authentication: bearer },
    body: testData,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((response) => console.log('Success:', JSON.stringify(response)))
    .catch((error) => console.error('Error:', error));
    */
};

const listeners = (closeModal) => {
  const formRef = document.querySelector('[name="login"]');
  formRef.addEventListener('submit', closeModal);
};

const showLogin = () => {
  modal(loginMarkUp, listeners);
  const formRef = document.querySelector('[name="login"]');
  formRef.addEventListener('submit', onLogin);
};

export default showLogin;
