import { GetSessionUserToken } from "../../providers/providers";

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

    window.location = "/home";

    const URI = `http://localhost:4500/api/post/${post_id}`;
    await fetch(URI, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) return console.log(result.error);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p>
        Êtes-vous sûr de vouloir supprimer ce post ? <br />
        L'ensemble des commentaires associés seront également supprimer.
      </p>

      <div>
        <button onClick={handleDeletePost} id="deletePostButton">
          Supprimer le post
        </button>
      </div>
    </div>
  );
};
