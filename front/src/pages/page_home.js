import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GetSessionUserToken } from "../providers/providers";
import { DateParser } from "../providers/providers";
import { CreatePost } from "../components/posts/post_create";
import { LikeUnlike } from "../components/posts/post_like";
import "../styles/pages/page_home.css";

export const PageHome = () => {
  const [errorModal, setErrorModal] = useState(null);
  const [isLoadedModal, setIsLoadedModal] = useState(false);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [postsModal, setPostsModal] = useState([]);

  const handleCreatePostModal = (e) => {
    if (e.target.id === "create") {
      if (createPostModal === false) {
        setCreatePostModal(true);
      } else {
        setCreatePostModal(false);
      }
    }
  };

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
      <section id="trendingSection">
        <div id="trendingTitleDiv">
          <h2 className="groupixColor">RECENTS</h2>
        </div>

        <div id="createPostButtonDiv">
          <button
            onClick={handleCreatePostModal}
            id="create"
            className={createPostModal ? "button--active" : "button"}
          >
            Créer un post
          </button>
        </div>

        {createPostModal && (
          <div id="createPostDiv">
            <CreatePost />
          </div>
        )}

        <div>
          {postsModal.map((post) => (
            <article key={post._id} className="postArticle">
              <div className="articleTitleDiv">
                <NavLink to={`/profile/${post.creator}/${post.creator_id}`}>
                  <p className="articleTitleDiv__author">{post.creator}</p>
                </NavLink>

                <NavLink to={`/post/${post._id}`}>
                  <h3 className="articleTitleDiv__title">{post.title}</h3>
                </NavLink>
              </div>

              <NavLink to={`/post/${post._id}`} className="articleContentDiv">
                <div className="articleImageDiv">
                  <img
                    src={require(`../uploads/posts/user_${post.creator_id}/${post.imgUrl}`)}
                    alt={post.title}
                    className="articleImageDiv__image"
                  ></img>
                </div>

                <div className="articleMessageDiv">
                  <p className="articleMessageDiv__message">{post.message}</p>
                </div>
              </NavLink>

              <div className="articleFooter">
                <div className="articleDateDiv">
                  <small>Create: {DateParser(post.createdAt)}</small>
                  <small>Update: {DateParser(post.updatedAt)}</small>
                </div>
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
