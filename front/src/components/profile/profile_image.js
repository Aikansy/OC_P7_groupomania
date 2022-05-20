import { useState } from "react";
import { GetSessionUserToken } from "../../providers/providers";

export function UploadProfileImage(props) {
  const [selectedFile, setSelectedFile] = useState();
  const sessionToken = GetSessionUserToken();
  const profile_id = parseInt(props.profile._id);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + sessionToken,
      },
    };

    const URI = `http://localhost:4500/api/auth/${profile_id}`;

    fetch(URI, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          if (result.error.includes("Forbidden")) {
            return alert("Vous ne pouvez modifier ce compte !");
          } else {
            console.log(result.error);
          }
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <input type="file" name="file" onChange={changeHandler} />
      </div>

      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}
