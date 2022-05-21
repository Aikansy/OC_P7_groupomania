import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";
import "../../styles/components/posts/post_image.css";

export function UpdatePostImage(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoadedModal, setIsLoadedModal] = useState(false);
  const [newImage, setNewImage] = useState("");
  const sessionToken = GetSessionUserToken();
  const post_id = parseInt(props.post._id);
  const creator_id = parseInt(props.post.creator_id);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("creator_id", creator_id);
    formData.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + sessionToken,
      },
    };

    const URI = `http://localhost:4500/api/post/${post_id}`;

    fetch(URI, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error.includes("Forbidden")) {
          return alert("Vous ne pouvez modifier ce post !");
        } else if (result.error) {
          return console.log(result.error);
        } else {
          setIsLoadedModal(true);
          setNewImage(result);
        }
      })
      .catch((error) => console.log(error));
  };

  if (!isLoadedModal) {
    return (
      <div>
        <div className="articleImageDiv">
          <img
            src={require(`../../uploads/posts/user_${creator_id}/${props.post.imgUrl}`)}
            alt={props.post.title}
            className="articleImageDiv__image"
          ></img>
        </div>

        <div className="updatePostImageInputDiv">
          <label htmlFor="file" className="updatePostImageInputDiv__label">
            Image (jpg, jpeg, png, gif)
          </label>

          <input
            type="file"
            name="file"
            onChange={changeHandler}
            className="updatePostImageInputDiv__file"
          />
        </div>

        <div className="updatePostImageButtonDiv">
          <button
            onClick={handleSubmission}
            className="updatePostImageButtonDiv__button"
          >
            Envoyer
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="articleImageDiv">
          <img
            src={require(`../../uploads/posts/user_${creator_id}/${newImage}`)}
            alt={props.post.title}
            className="articleImageDiv__image"
          ></img>
        </div>

        <div className="updatePostImageInputDiv">
          <label htmlFor="file" className="updatePostImageInputDiv__label">
            Image (jpg, jpeg, png, gif)
          </label>

          <input
            type="file"
            name="file"
            onChange={changeHandler}
            className="updatePostImageInputDiv__file"
          />

          <div className="updatePostImageButtonDiv">
            <button
              onClick={handleSubmission}
              className="updatePostImageButtonDiv__button"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    );
  }
}
