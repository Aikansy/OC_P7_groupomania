import { GetSessionUserToken } from "../../providers/providers";
import "../../styles/components/profile/profile_delete.css";

export const ProfileDelete = (props) => {
  const handleDeleteProfile = async (e) => {
    e.preventDefault();

    const sessionToken = GetSessionUserToken();
    const profile_id = parseInt(props._id);

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionToken,
      },
    };

    const URI = `http://localhost:4500/api/auth/${profile_id}`;
    const response = await fetch(URI, requestOptions);
    const result = await response.json();

    if (result.error) {
      if (result.error.includes("Forbidden")) {
        return alert("Vous ne pouvez modifier ce compte !");
      } else {
        console.log(result.error);
      }
    } else {
      localStorage.clear("hauler_user");
      window.location = "/";
    }
  };

  return (
    <div id="deleteProfileForm">
      <div className="deleteProfileTitleDiv">
        <h3>SUPPRIMER LE PROFIL</h3>
      </div>

      <p className="deleteProfileMessageDiv">
        Êtes-vous sûr de vouloir supprimer ce compte ? L'ensemble de ses
        informations, posts et commentaires seront également supprimés.
      </p>

      <div className="deleteProfileButtonDiv">
        <button
          onClick={handleDeleteProfile}
          id="deleteUserButton"
          className="deleteProfileButtonDiv__button"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};
