const addToken = async (item) => {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return false;
  } else {
    localStorage.setItem("user", JSON.stringify(item));
    return true;
  }
};

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  return token;
};

const formValidity = () => {
  const nickname = document.querySelector("#nickname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const nicknameError = document.querySelector("#nicknameErrorMsg");
  const emailError = document.querySelector("#emailErrorMsg");
  const passwordError = document.querySelector("#passwordErrorMsg");

  let formError = false;

  if (!nickname.match(/^[A-Za-zÜ-ü'\s-]{2,50}$/)) {
    nicknameError.textContent = `(Nombre de caractères acceptés : min: 2, max: 50) Caractères acceptés : lettres majuscules et minuscules, accents, apostrophe, espace et tiret`;
    formError = true;
  } else {
    nicknameError.textContent = "";
  }

  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailError.textContent = `Format email invalide`;
    formError = true;
  } else {
    emailError.textContent = "";
  }

  if (!password.match(/^[\0-9A-Za-z]{8,50}$/)) {
    passwordError.textContent = `(Nombre de caractères acceptés : min: 8, max: 50) Caractères acceptés : chiffres, lettres majuscules et minuscules`;
    formError = true;
  } else {
    passwordError.textContent = "";
  }

  return formError;
};

module.exports.addToken = addToken;
module.exports.getToken = getToken;
module.exports.formValidity = formValidity;
