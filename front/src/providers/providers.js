export const AddSessionUser = async (item) => {
  let user = JSON.parse(localStorage.getItem("hauler_user"));

  if (user) {
    localStorage.clear("hauler_user");
    localStorage.setItem("hauler_user", JSON.stringify(item));
  } else {
    localStorage.setItem("hauler_user", JSON.stringify(item));
  }
};

export const GetSessionUserToken = () => {
  const user = JSON.parse(localStorage.getItem("hauler_user"));

  if (!user) {
    const token = "";
    return token;
  } else {
    const token = user.token;
    return token;
  }
};

export const GetSessionUserId = () => {
  const user = JSON.parse(localStorage.getItem("hauler_user"));

  if (!user) {
    const userId = "";
    return userId;
  } else {
    const userId = user.userId;
    return userId;
  }
};

export const GetSessionUserNickname = () => {
  const user = JSON.parse(localStorage.getItem("hauler_user"));

  if (!user) {
    const nickname = "";
    return nickname;
  } else {
    const nickname = user.nickname;
    return nickname;
  }
};

export const UpdateSessionUserNickname = (newNickname) => {
  const user = JSON.parse(localStorage.getItem("hauler_user"));

  user.nickname = newNickname;
  localStorage.setItem("hauler_user", JSON.stringify(user));
};

export const SignupformError = () => {
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

  if (!password.match(/^[\0-9A-ZÜ-üa-z_]{8,50}$/)) {
    passwordError.textContent = `Caractères acceptés : min: 8, max: 50, chiffres, lettres majuscules et minuscules, accents et underscore.`;
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

export const FormProfileError = () => {
  const nickname = document.querySelector("#nickname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmed = document.querySelector("#confirmedPassword").value;
  const description = document.querySelector("#description").value;

  const nicknameError = document.querySelector("#nicknameErrorMsg");
  const emailError = document.querySelector("#emailErrorMsg");
  const passwordError = document.querySelector("#passwordErrorMsg");
  const confirmedError = document.querySelector("#confirmedPasswordErrorMsg");
  const descriptionError = document.querySelector("#descriptionErrorMsg");

  let error = false;

  if (nickname) {
    if (!nickname.match(/^[A-Za-zÜ-ü'\s-]{2,50}$/)) {
      nicknameError.textContent = `Caractères acceptés : min: 2, max: 50, lettres majuscules et minuscules, accents, apostrophe, espace et tiret.`;
      error = true;
    } else {
      nicknameError.textContent = "";
    }
  }

  if (email) {
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      emailError.textContent = `Format email invalide.`;
      error = true;
    } else {
      emailError.textContent = "";
    }
  }

  if (password || confirmed) {
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
  }

  if (description) {
    if (!description.match(/^[\dA-Za-zÜ-ü,:'./#\s?!)(-]{2,280}$/)) {
      descriptionError.textContent = `Caractères acceptés : min: 2, max: 280, chiffres, lettres majuscules et minuscules, accents, virgule, double-point, apostrophe, slash, dièze, point, point d'interrogation et exclamation, parenthèses, espace et tiret`;
      error = true;
    } else {
      descriptionError.textContent = "";
    }
  }

  return error;
};

export const FormPostError = () => {
  const title = document.querySelector("#postTitle").value;
  const message = document.querySelector("#postMessage").value;

  const titleError = document.querySelector("#postTitleErrorMsg");
  const messageError = document.querySelector("#postMessageErrorMsg");

  let error = false;

  if (title) {
    if (!title.match(/^[\dA-Za-zÜ-ü"'/#.\s?!)(-]{2,100}$/)) {
      titleError.textContent = `Caractères acceptés : min: 2, max: 100, chiffres, lettres majuscules et minuscules, accents, apostrophe, guillemet, slash, dièze, point, point d'interrogation et exclamation, parenthèses, espace et tiret`;
      error = true;
    } else {
      titleError.textContent = "";
    }
  }

  if (message) {
    if (!message.match(/^[\dA-Za-zÜ-ü,:"'/#.\s?!)(-]{2,280}$/)) {
      messageError.textContent = `Caractères acceptés : min: 2, max: 280, chiffres, lettres majuscules et minuscules, accents, virgule, double-point, apostrophe, guillemet, slash, dièze, point, point d'interrogation et exclamation, parenthèses, espace et tiret`;
      error = true;
    } else {
      messageError.textContent = "";
    }
  }

  return error;
};

export const FormCommentError = () => {
  const content = document.querySelector("#commentContent").value;

  const contentError = document.querySelector("#commentContentErrorMsg");

  let error = false;

  if (!content.match(/^[\dA-Za-zÜ-ü,:"'/#.\s?!)(-]{2,280}$/)) {
    contentError.textContent = `Caractères acceptés : min: 2, max: 280, chiffres, lettres majuscules et minuscules, accents, virgule, double-point, apostrophe, guillemet, slash, dièze, point, point d'interrogation et exclamation, parenthèses, espace et tiret`;
    error = true;
  } else {
    contentError.textContent = "";
  }

  return error;
};

export const DateParser = (num) => {
  let options = {
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};
