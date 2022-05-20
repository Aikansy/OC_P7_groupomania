import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";
import { FormCommentError } from "../../providers/providers";

export const CreateComment = (props) => {
  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const post_id = parseInt(props.post_id);

  const handleModals = async (e) => {
    e.preventDefault();

    const comment = {
      title: e.target.commentTitle.value,
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
    <form action="" onSubmit={handleModals}>
      <div>
        <label htmlFor="commentTitle">Titre</label>
        <input
          type="text"
          name="commentTitle"
          id="commentTitle"
          onChange={(e) => setCommentTitle(e.target.value)}
          value={commentTitle}
          required
        />
        <p id="commentTitleErrorMsg"></p>
      </div>

      <div>
        <label htmlFor="commentContent">Message (280 caractères max)</label>
        <input
          type="text"
          name="commentContent"
          id="commentContent"
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
        />
        <p id="commentContentErrorMsg"></p>
      </div>

      <div>
        <input type="submit" value="Commenter"></input>
      </div>
    </form>
  );
};
