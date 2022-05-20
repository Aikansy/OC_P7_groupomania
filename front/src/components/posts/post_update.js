import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";
import { FormPostError } from "../../providers/providers";

export const PostUpdate = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postMessage, setPostMessage] = useState("");

  const post_id = parseInt(props.post._id);
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
        window.location = "/home";
      }
    }
  };

  return (
    <form action="" onSubmit={handleModals}>
      <div>
        <label htmlFor="postTitle">Titre</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          onChange={(e) => setPostTitle(e.target.value)}
          value={postTitle}
        />
        <p id="postTitleErrorMsg"></p>
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
        <input type="submit" value="Poster"></input>
      </div>
    </form>
  );
};