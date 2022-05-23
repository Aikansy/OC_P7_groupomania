import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";
import { GetSessionUserId } from "../../providers/providers";
import { FormPostError } from "../../providers/providers";
import "../../styles/components/posts/post_create.css";

export const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postImgUrl, setPostImgUrl] = useState("");
  const [postMessage, setPostMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const sessionToken = GetSessionUserToken();
    const sessionId = GetSessionUserId();

    let formData = new FormData();
    formData.append("creator_id", sessionId);
    formData.append("title", postTitle);
    formData.append("message", postMessage);
    formData.append("image", postImgUrl);

    if (FormPostError() === false) {
      const requestOptions = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + sessionToken,
        },
      };

      const URI = `http://localhost:4500/api/post/`;

      await fetch(URI, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.error) return console.log(result.error);
        })
        .catch((error) => {
          console.log(error);
        });

      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={submit}
      method="post"
      encType="multipart/form-data"
      id="createPostForm"
    >
      <div className="createPostTitleDiv">
        <h3>POSTER UN MESSAGE</h3>
      </div>

      <div className="createPostInputDiv">
        <label htmlFor="postTitle" className="createPostInputDiv__label">
          Titre
        </label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          className="createPostInputDiv__input"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
        <p id="postTitleErrorMsg"></p>
      </div>

      <div className="createPostInputDiv">
        <label htmlFor="file" className="createPostInputDiv__label">
          Image (jpg, jpeg, png, gif)
        </label>
        <input
          type="file"
          name="file"
          id="file"
          className="createPostInputDiv__file"
          onChange={(e) => setPostImgUrl(e.target.files[0])}
        />
      </div>

      <div className="createPostInputDiv">
        <label htmlFor="postMessage" className="createPostInputDiv__label">
          Message
        </label>
        <input
          type="text"
          name="postMessage"
          id="postMessage"
          className="createPostInputDiv__message"
          onChange={(e) => setPostMessage(e.target.value)}
          value={postMessage}
        />
        <p id="postMessageErrorMsg"></p>
      </div>

      <div className="createPostButtonDiv">
        <button type="submit" className="createPostButtonDiv__button">
          Poster
        </button>
      </div>
    </form>
  );
};
