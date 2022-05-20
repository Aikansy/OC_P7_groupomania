import "../styles/normalize.css";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GetSessionUserToken } from "../providers/providers";
import { DateParser } from "../providers/providers";
import { CreatePost } from "../components/posts/post_create";
import { LikeUnlike } from "../components/posts/post_like";

export const PageHome = () => {
  const [errorModal, setErrorModal] = useState(null);
  const [isLoadedModal, setIsLoadedModal] = useState(false);
  const [postsModal, setPostsModal] = useState([]);

  useEffect(() => {
    const sessionToken = GetSessionUserToken();

    if (!sessionToken) {
      window.location = "/";
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionToken,
      },
    };

    fetch("http://localhost:4500/api/post/", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setIsLoadedModal(true);
        setPostsModal(result.posts.reverse());
      })
      .catch((error) => {
        setIsLoadedModal(true);
        setErrorModal(error);
      });
  }, []);

  if (errorModal) {
    return <div>Erreur : {errorModal}</div>;
  } else if (!isLoadedModal) {
    return <div>Chargement...</div>;
  } else {
    return (
      <section>
        <div>
          <h2>TRENDING</h2>
        </div>

        <div>
          <CreatePost />
        </div>

        <div>
          {postsModal.map((post) => (
            <article key={post._id}>
              <div>
                <NavLink to={`/profile/${post.creator}/${post.creator_id}`}>
                  <small>{post.creator}</small>
                </NavLink>
                <NavLink to={`/post/${post._id}`}>
                  <h3>{post.title}</h3>
                </NavLink>
              </div>

              <NavLink to={`/post/${post._id}`}>
                <div>
                  <img
                    src={require(`../uploads/posts/user_${post.creator_id}/${post.imgUrl}`)}
                    alt={post.title}
                  ></img>
                </div>

                {
                  // import {} from "../uploads/posts/user_1/postid_1_creatorid_1.gif"
                }

                <div>
                  <p>{post.message}</p>
                </div>

                <div>
                  <small>Création : {DateParser(post.createdAt)}</small>
                  <small>Modification : {DateParser(post.updatedAt)}</small>
                </div>
              </NavLink>

              <div>
                <LikeUnlike post={post} />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }
};

// "../uploads/posts/user_1/user_1_1652693705291.png"
