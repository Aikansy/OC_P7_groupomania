import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";
import { UpdateSessionUserNickname } from "../../providers/providers";
import { FormProfileError } from "../../providers/providers";
import { UploadProfileImage } from "./profile_image";
import "../../styles/components/profile/profile_update.css";

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

    if (FormProfileError() === false) {
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
          console.log(result.error);
          emailError.textContent = "";
        }
      } else {
        if (user.nickname) {
          UpdateSessionUserNickname(user.nickname);
          window.location = `/profile/${user.nickname}/${profile_id}`;
        } else {
          window.location = `/profile/${profile_name}/${profile_id}`;
        }
      }
    }
  };

  return (
    <form onSubmit={handleModals} id="updateProfileForm">
      <UploadProfileImage profile={props} />

      <div className="updateProfileTitleDiv">
        <h3>MODIFIER LE PROFIL</h3>
      </div>

      <div className="updateProfileInputDiv">
        <label htmlFor="nickname" className="updateProfileInputDiv__label">
          Nom d'utilisateur
        </label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          className="updateProfileInputDiv__input"
          onChange={(event) => setNickname(event.target.value)}
          value={nickname}
        />
        <p id="nicknameErrorMsg"></p>
      </div>

      <div className="updateProfileInputDiv">
        <label htmlFor="email" className="updateProfileInputDiv__label">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="updateProfileInputDiv__input"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <p id="emailErrorMsg"></p>
      </div>

      <div className="updateProfileInputDiv">
        <label htmlFor="password" className="updateProfileInputDiv__label">
          Nouveau mot de passe
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="updateProfileInputDiv__input"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <p id="passwordErrorMsg"></p>
      </div>

      <div className="updateProfileInputDiv">
        <label
          htmlFor="confirmedPassword"
          className="updateProfileInputDiv__label"
        >
          Confirmer le nouveau mot de passe
        </label>
        <input
          type="password"
          name="confirmedPassword"
          id="confirmedPassword"
          className="updateProfileInputDiv__input"
          onChange={(event) => setConfirmedPassword(event.target.value)}
          value={confirmedPassword}
        />
        <p id="confirmedPasswordErrorMsg"></p>
      </div>

      <div className="updateProfileInputDiv">
        <label htmlFor="description" className="updateProfileInputDiv__label">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          className="updateProfileInputDiv__input"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <p id="descriptionErrorMsg"></p>
      </div>

      <div className="updateProfileButtonDiv">
        <input
          type="submit"
          value="Mettre à jour"
          id="update"
          className="updateProfileButtonDiv__button"
        ></input>
      </div>
    </form>
  );
};
