import "../styles/normalize.css";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GetSessionUserToken } from "../providers/providers";
import { DateParser } from "../providers/providers";
import { ProfileUpdate } from "../components/profile/profile_update";
import { ProfileDelete } from "../components/profile/profile_delete";
import { UploadProfileImage } from "../components/profile/profile_image";

export const PageProfile = () => {
  const [errorModal, setErrorModal] = useState(null);
  const [isLoadedModal, setIsLoadedModal] = useState(false);
  const [profileModal, setProfileModal] = useState([]);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [deleteProfileModal, setDeleteProfileModal] = useState(false);

  let { id } = useParams();

  const handleModals = (event) => {
    if (event.target.id === "update") {
      setUpdateProfileModal(true);
      setDeleteProfileModal(false);
    } else if (event.target.id === "delete") {
      setUpdateProfileModal(false);
      setDeleteProfileModal(true);
    }
  };

  useEffect(() => {
    const sessionToken = GetSessionUserToken();

    if (!sessionToken) {
      window.location = "/";
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": ["application/json", "imgage/jpg"],
        Authorization: "Bearer " + sessionToken,
      },
    };

    fetch(`http://localhost:4500/api/auth/${id}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setIsLoadedModal(true);
        setProfileModal(result.account);
      })
      .catch((error) => {
        setIsLoadedModal(true);
        setErrorModal(error);
      });
  }, [id]);

  if (errorModal) {
    return <div>Erreur : {errorModal}</div>;
  } else if (!isLoadedModal) {
    return <div>Chargement...</div>;
  } else {
    return (
      <section>
        <div>
          <h2>
            PROFILE : {profileModal.nickname}#{id}
          </h2>
        </div>

        <article id={profileModal._id}>
          <div>
            <img
              src={require(`../uploads/profils/user_${id}/profile_${id}.jpg`)}
              alt={profileModal.nickname}
            />
          </div>

          <div>
            <UploadProfileImage profile={profileModal} />
          </div>

          <div>
            <p>Email: {profileModal.email}</p>
            <p>Bio: {profileModal.description}</p>
            <p>Membre depuis le : {DateParser(profileModal.createdAt)}</p>
          </div>
        </article>

        <div>
          <button
            onClick={handleModals}
            id="update"
            className={updateProfileModal ? "button--active" : "button"}
          >
            Modifier mon profil
          </button>

          <button
            onClick={handleModals}
            id="delete"
            className={deleteProfileModal ? "button--active" : "button"}
          >
            Supprimer mon compte
          </button>
        </div>

        {updateProfileModal && (
          <ProfileUpdate _id={id} name={profileModal.nickname} />
        )}
        {deleteProfileModal && <ProfileDelete _id={id} />}
      </section>
    );
  }
};
