import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";

export const LikeUnlike = (props) => {
  const [initalLikeModal, setInitialLikeModal] = useState(true);
  const [likeModal, setLikeModal] = useState("");
  const post_id = parseInt(props.post._id);
  const post_likes = props.post.likes;

  const handleModals = async (e) => {
    if (e.target.id === "likesButton") {
      setInitialLikeModal(false);
    }

    const sessionToken = GetSessionUserToken();

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionToken,
      },
    };

    const URI = `http://localhost:4500/api/post/${post_id}/like`;
    const response = await fetch(URI, requestOptions);

    const result = await response.json();
    const newLikes = result.updatedPost.likes;

    setLikeModal(newLikes);
  };

  if (initalLikeModal) {
    return (
      <button onClick={handleModals} id="likesButton">
        Likes {post_likes}
      </button>
    );
  } else {
    return (
      <button onClick={handleModals} id="likesButton">
        Likes {likeModal}
      </button>
    );
  }
};
