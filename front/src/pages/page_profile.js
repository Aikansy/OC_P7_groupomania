import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GetSessionUserToken } from "../providers/providers";
import { DateParser } from "../providers/providers";
import { ProfileUpdate } from "../components/profile/profile_update";
import { ProfileDelete } from "../components/profile/profile_delete";
import "../styles/pages/page_profile.css";

export const PageProfile = () => {
  const [errorModal, setErrorModal] = useState(null);
  const [isLoadedModal, setIsLoadedModal] = useState(false);
  const [profileModal, setProfileModal] = useState([]);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [deleteProfileModal, setDeleteProfileModal] = useState(false);

  let { id } = useParams();

  const handleModals = (event) => {
    if (event.target.id === "update") {
      if (updateProfileModal === false) {
        setUpdateProfileModal(true);
        setDeleteProfileModal(false);
      } else {
        setUpdateProfileModal(false);
        setDeleteProfileModal(false);
      }
    }
    if (event.target.id === "delete") {
      if (deleteProfileModal === false) {
        setUpdateProfileModal(false);
        setDeleteProfileModal(true);
      } else {
        setUpdateProfileModal(false);
        setDeleteProfileModal(false);
      }
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
      <section id="profilePage">
        <div className="profilePageTitleDiv">
          <h2>
            TAG : {profileModal.nickname}#{id}
          </h2>
        </div>

        <article id={profileModal._id} className="profileArticle">
          <div className="profileImageDiv">
            <img
              src={require(`../uploads/profils/user_${id}/profile_${id}.jpg`)}
              alt={profileModal.nickname}
              className="profileImageDiv__image"
            />
          </div>

          <div className="profileContentDiv">
            <div className="profileContentDiv__title">
              <h3>{profileModal.nickname}</h3>
            </div>
            <p className="profileContentDiv__email">
              Email: <br />
              {profileModal.email}
            </p>
            <p className="profileContentDiv__bio">
              Bio: <br />
              {profileModal.description}
            </p>
            <p className="profileContentDiv__date">
              Membre depuis le : <br />
              {DateParser(profileModal.createdAt)}
            </p>
          </div>
        </article>

        <div className="profileFeaturesDiv">
          <button
            onClick={handleModals}
            id="update"
            className={updateProfileModal ? "button--active" : "button"}
          >
            Modifier
          </button>

          <button
            onClick={handleModals}
            id="delete"
            className={deleteProfileModal ? "button--active" : "button"}
          >
            Supprimer
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
