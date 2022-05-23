import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";
import { FormPostError } from "../../providers/providers";
import { UpdatePostImage } from "./post_image";
import "../../styles/components/posts/post_update.css";

export const PostUpdate = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postMessage, setPostMessage] = useState("");

  const post_id = parseInt(props.post._id);
  const post = props.post;
  const sessionToken = GetSessionUserToken();

  const handleModals = async (e) => {
    e.preventDefault();

    const data = {
      title: postTitle,
      message: postMessage,
    };

    if (FormPostError() === false) {
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: "Bearer " + sessionToken,
          "Content-Type": "application/json",
        },
      };

      const URI = `http://localhost:4500/api/post/${post_id}`;
      const response = await fetch(URI, requestOptions);
      const result = await response.json();

      if (result.error) {
        if (result.error.includes("Forbidden")) {
          return alert("Vous ne pouvez modifier ce post !");
        }
      } else {
        window.location = `/post/${post_id}`;
      }
    }
  };

  return (
    <form onSubmit={handleModals} id="updatePostForm">
      <UpdatePostImage post={post} />

      <div className="updatePostTitleDiv">
        <h3>MODIFIER LE POST</h3>
      </div>

      <div className="updatePostInputDiv">
        <label htmlFor="postTitle" className="updatePostInputDiv__label">
          Titre
        </label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          className="updatePostInputDiv__input"
          onChange={(e) => setPostTitle(e.target.value)}
          value={postTitle}
        />
        <p id="postTitleErrorMsg"></p>
      </div>

      <div className="updatePostInputDiv">
        <label htmlFor="postMessage" className="updatePostInputDiv__label">
          Message
        </label>
        <input
          type="text"
          name="postMessage"
          id="postMessage"
          className="updatePostInputDiv__input"
          onChange={(e) => setPostMessage(e.target.value)}
          value={postMessage}
        />
        <p id="postMessageErrorMsg"></p>
      </div>

      <div className="updatePostButtonDiv">
        <input
          type="submit"
          value="Poster"
          className="updatePostButtonDiv__button"
        ></input>
      </div>
    </form>
  );
};
