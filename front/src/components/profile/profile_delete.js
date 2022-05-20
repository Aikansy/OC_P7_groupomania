import { GetSessionUserToken } from "../../providers/providers";

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
      }
    } else {
      localStorage.clear("hauler_user");
      window.location = "/";
    }
  };

  return (
    <div>
      <div>
        <h3>Supprimer mon profil</h3>
      </div>

      <div>
        <p>
          Êtes-vous sûr de vouloir supprimer votre compte ? <br />
          L'ensemble de vos posts et commentaires seront également supprimer.
        </p>
      </div>

      <div>
        <button onClick={handleDeleteProfile} id="deleteUserButton">
          Supprimer
        </button>
      </div>
    </div>
  );
};
