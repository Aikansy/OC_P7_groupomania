import { GetSessionUserToken } from "../../providers/providers";
import "../../styles/components/comments/comment_delete.css";

export const DeleteComment = (props) => {
  const handleModals = async (e) => {
    e.preventDefault();

    const sessionToken = GetSessionUserToken();
    const post_id = parseInt(props.post_id);
    const comment_id = parseInt(props.comment_id);

    const comment = {
      comment_id: comment_id,
    };

    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionToken,
      },
    };

    const URI = `http://localhost:4500/api/post/${post_id}/comment`;
    const response = await fetch(URI, requestOptions);
    const result = await response.json();

    if (result.error) {
      if (result.error.includes("Forbidden")) {
        return alert("Vous ne pouvez supprimer ce commentaire !");
      }
    } else {
      window.location = `/post/${post_id}`;
    }
  };

  return (
    <button onClick={handleModals} className="deleteCommentButton">
      Supprimer
    </button>
  );
};
