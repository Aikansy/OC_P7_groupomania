import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GetSessionUserToken } from "../providers/providers";
import { DateParser } from "../providers/providers";
import { PostUpdate } from "../components/posts/post_update";
import { PostDelete } from "../components/posts/post_delete";
import { CreateComment } from "../components/comments/comment_create";
import { DeleteComment } from "../components/comments/comment_delete";
import { LikeUnlike } from "../components/posts/post_like";
import { UpdatePostImage } from "../components/posts/post_image";
import "../styles/pages/page_post.css";

export const PagePost = () => {
  const [errorModal, setErrorModal] = useState(null);
  const [isLoadedModal, setIsLoadedModal] = useState(false);
  const [post, setPost] = useState([]);
  const [updatePostModal, setUpdatePostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [createCommentModal, setCreateCommentModal] = useState(false);
  const [commentsModal, setCommentsModal] = useState([]);

  let { id } = useParams();

  const handleModals = (e) => {
    if (e.target.id === "comment") {
      if (createCommentModal === false) {
        setCreateCommentModal(true);
        setUpdatePostModal(false);
        setDeletePostModal(false);
      } else {
        setCreateCommentModal(false);
        setUpdatePostModal(false);
        setDeletePostModal(false);
      }
    }

    if (e.target.id === "update") {
      if (updatePostModal === false) {
        setCreateCommentModal(false);
        setUpdatePostModal(true);
        setDeletePostModal(false);
      } else {
        setCreateCommentModal(false);
        setUpdatePostModal(false);
        setDeletePostModal(false);
      }
    }

    if (e.target.id === "delete") {
      if (deletePostModal === false) {
        setCreateCommentModal(false);
        setUpdatePostModal(false);
        setDeletePostModal(true);
      } else {
        setCreateCommentModal(false);
        setUpdatePostModal(false);
        setDeletePostModal(false);
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

    fetch(`http://localhost:4500/api/post/${id}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setIsLoadedModal(true);
        setPost(result.post);
      })
      .catch((error) => {
        setIsLoadedModal(true);
        setErrorModal(error);
      });

    fetch(`http://localhost:4500/api/post/${id}/comment`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setCommentsModal(result.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (errorModal) {
    return <div>Erreur : {errorModal}</div>;
  } else if (!isLoadedModal) {
    return <div>Chargement...</div>;
  } else {
    return (
      <section id="postPage">
        <div className="postPageTitleDiv">
          <h2 className="groupixColor">POST</h2>
        </div>

        <article key={post._id} className="postArticle">
          <div className="articleTitleDiv">
            <NavLink to={`/profile/${post.creator}/${post.creator_id}`}>
              <p className="articleTitleDiv__author">{post.creator}</p>
            </NavLink>

            <NavLink to={`/post/${post._id}`}>
              <h3 className="articleTitleDiv__title">{post.title}</h3>
            </NavLink>
          </div>

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

          <div className="articleFooter">
            <div className="articleDateDiv">
              <small>Create: {DateParser(post.createdAt)}</small>
              <small>Update: {DateParser(post.updatedAt)}</small>
            </div>

            <LikeUnlike post={post} />
          </div>
        </article>

        <div id="postFeaturesDiv">
          <button
            onClick={handleModals}
            id="comment"
            className={createCommentModal ? "button--active" : "button"}
          >
            Commenter
          </button>

          <button
            onClick={handleModals}
            id="update"
            className={updatePostModal ? "button--active" : "button"}
          >
            Modifier
          </button>

          <button
            onClick={handleModals}
            id="delete"
            className={deletePostModal ? "button--active" : "button"}
          >
            Supprimer
          </button>
        </div>

        {createCommentModal && <CreateComment post_id={id} />}
        {updatePostModal && <PostUpdate post={post} />}
        {deletePostModal && <PostDelete post_id={id} />}

        {commentsModal.map((comment) => (
          <aside key={comment._id} className="comment">
            <div className="commentTitleDiv">
              <NavLink
                to={`/profile/${comment.commentator}/${comment.commentator_id}`}
              >
                <p className="commentTitleDiv__author">{comment.commentator}</p>
              </NavLink>
              <h3 className="groupixColor commentTitleDiv__title">
                {comment.title}
              </h3>
            </div>

            <div className="commentContentDiv">
              <p className="commentContentDiv__content">{comment.content}</p>
            </div>

            <div className="commentFooter">
              <small>Create: {DateParser(comment.createdAt)}</small>
              <DeleteComment post_id={id} comment_id={comment._id} />
            </div>
          </aside>
        ))}
      </section>
    );
  }
};
