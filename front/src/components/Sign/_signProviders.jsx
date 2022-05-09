export const formError = () => {
  const nickname = document.querySelector("#nickname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmed = document.querySelector("#confirmedPassword").value;
  const cgu = document.querySelector("#cgu");

  const nicknameError = document.querySelector("#nicknameErrorMsg");
  const emailError = document.querySelector("#emailErrorMsg");
  const passwordError = document.querySelector("#passwordErrorMsg");
  const confirmedError = document.querySelector("#confirmedPasswordErrorMsg");
  const cguError = document.querySelector("#cguErrorMsg");

  let error = false;

  if (!nickname.match(/^[A-Za-zÜ-ü'\s-]{2,50}$/)) {
    nicknameError.textContent = `Caractères acceptés : min: 2, max: 50, lettres majuscules et minuscules, accents, apostrophe, espace et tiret.`;
    error = true;
  } else {
    nicknameError.textContent = "";
  }

  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailError.textContent = `Format email invalide.`;
    error = true;
  } else {
    emailError.textContent = "";
  }

  if (!password.match(/^[\0-9A-Za-z]{8,50}$/)) {
    passwordError.textContent = `Caractères acceptés : min: 8, max: 50, chiffres, lettres majuscules et minuscules.`;
    error = true;
  } else {
    passwordError.textContent = "";
  }

  if (confirmed !== password) {
    confirmedError.textContent = "Les mots de passe ne correspondent pas.";
    error = true;
  } else {
    confirmedError.textContent = "";
  }

  if (!cgu.checked) {
    cguError.textContent = "Vous devez accepter les CGU pour vous inscrire.";
    error = true;
  } else {
    cguError.textContent = "";
  }

  return error;
};
