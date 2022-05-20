import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";
import { UpdateSessionUserNickname } from "../../providers/providers";

export const ProfileUpdate = (props) => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [description, setDescription] = useState("");
  const emailError = document.querySelector("#emailErrorMsg");
  const profile_id = parseInt(props._id);
  const profile_name = props.name;

  const handleModals = async (e) => {
    e.preventDefault();

    const user = {
      nickname: e.target.nickname.value,
      password: e.target.password.value,
      email: e.target.email.value,
      description: e.target.description.value,
    };

    const sessionToken = GetSessionUserToken();

    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionToken,
      },
    };

    const URI = `http://localhost:4500/api/auth/${profile_id}`;
    const response = await fetch(URI, requestOptions);
    const result = await response.json();

    if (result.error) {
      if (result.error.includes("Email")) {
        emailError.textContent = "Email déjà utilisé";
      } else {
        emailError.textContent = "";
      }

      if (result.error.includes("Forbidden")) {
        return alert("Vous ne pouvez modifier ce compte !");
      }
    } else {
      if (user.nickname) {
        UpdateSessionUserNickname(user.nickname);
        window.location = `/profile/${user.nickname}/${profile_id}`;
      } else {
        window.location = `/profile/${profile_name}/${profile_id}`;
      }
    }
  };

  return (
    <form action="" onSubmit={handleModals}>
      <div>
        <h3>Modifier mon profil</h3>
      </div>

      <div>
        <label htmlFor="nickname">Nom d'utilisateur</label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          onChange={(event) => setNickname(event.target.value)}
          value={nickname}
        />
        <p id="nicknameErrorMsg"></p>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <p id="emailErrorMsg"></p>
      </div>

      <div>
        <label htmlFor="password">Nouveau mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <p id="passwordErrorMsg"></p>
      </div>

      <div>
        <label htmlFor="confirmedPassword">
          Confirmer le nouveau mot de passe
        </label>
        <input
          type="password"
          name="confirmedPassword"
          id="confirmedPassword"
          onChange={(event) => setConfirmedPassword(event.target.value)}
          value={confirmedPassword}
        />
        <p id="confirmedPasswordErrorMsg"></p>
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <p id="descriptionErrorMsg"></p>
      </div>

      <div>
        <input type="submit" value="Mettre à jour" id="update"></input>
      </div>
    </form>
  );
};
