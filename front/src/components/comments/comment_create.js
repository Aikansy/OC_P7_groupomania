import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";
import { FormCommentError } from "../../providers/providers";
import "../../styles/components/comments/comment_create.css";

export const CreateComment = (props) => {
  const [commentContent, setCommentContent] = useState("");

  const post_id = parseInt(props.post_id);

  const handleModals = async (e) => {
    e.preventDefault();

    const comment = {
      content: e.target.commentContent.value,
    };

    if (FormCommentError() === false) {
      const sessionToken = GetSessionUserToken();

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionToken,
        },
      };

      const URI = `http://localhost:4500/api/post/${post_id}/comment`;
      const response = await fetch(URI, requestOptions);
      const result = await response.json();

      if (result.error) {
        console.log(result.error);
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <form onSubmit={handleModals} id="commentForm">
      <div className="createCommentTitleDiv">
        <h3>POSTER UN COMMENTAIRE</h3>
      </div>

      <div className="createCommentInputDiv">
        <label
          htmlFor="commentContent"
          className="createCommentInputDiv__label"
        >
          Message
        </label>
        <input
          type="text"
          name="commentContent"
          id="commentContent"
          className="createCommentInputDiv__input"
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
        />
        <p id="commentContentErrorMsg"></p>
      </div>

      <div className="createCommentButtonDiv">
        <input
          type="submit"
          value="Commenter"
          className="createCommentButtonDiv__button"
        ></input>
      </div>
    </form>
  );
};
