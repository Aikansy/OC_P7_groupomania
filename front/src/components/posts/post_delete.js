import { GetSessionUserToken } from "../../providers/providers";
import "../../styles/components/posts/post_delete.css";

export const PostDelete = (props) => {
  const handleDeletePost = async (e) => {
    e.preventDefault();

    const sessionToken = GetSessionUserToken();
    const post_id = parseInt(props.post_id);

    const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionToken,
      },
    };

    const URI = `http://localhost:4500/api/post/${post_id}`;
    await fetch(URI, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          if (result.error.includes("Forbidden")) {
            return alert("Vous ne pouvez modifier ce post !");
          } else {
            return console.log(result.error);
          }
        } else if (result.message) {
          if (result.message.includes("deleted")) {
            window.location = "/home";
          } else {
            console.log(result);
          }
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="deletePostForm">
      <div className="deletePostTitleDiv">
        <h3>SUPPRIMER LE POST</h3>
      </div>

      <p className="deletePostMessageDiv">
        Êtes-vous sûr de vouloir supprimer ce post ? L'ensemble des commentaires
        associés seront également supprimés.
      </p>

      <div className="deletePostButtonDiv">
        <button
          onClick={handleDeletePost}
          id="deletePostButton"
          className="deletePostButtonDiv__button"
        >
          Supprimer le post
        </button>
      </div>
    </div>
  );
};
