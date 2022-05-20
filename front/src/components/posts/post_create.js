import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";
import { GetSessionUserId } from "../../providers/providers";

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
  };

  return (
    <form onSubmit={submit} method="post" encType="multipart/form-data">
      <div>
        <label htmlFor="postTitle">Titre</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
        <p id="postTitleErrorMsg"></p>
      </div>

      <div>
        <input
          type="file"
          name="file"
          onChange={(e) => setPostImgUrl(e.target.files[0])}
        />
      </div>

      <div>
        <label htmlFor="postMessage">Message (280 caractères max)</label>
        <input
          type="text"
          name="postMessage"
          id="postMessage"
          onChange={(e) => setPostMessage(e.target.value)}
          value={postMessage}
        />
        <p id="postMessageErrorMsg"></p>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
