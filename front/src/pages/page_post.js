import "../styles/normalize.css";
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
      setCreateCommentModal(true);
      setUpdatePostModal(false);
      setDeletePostModal(false);
    }
    if (e.target.id === "update") {
      setCreateCommentModal(false);
      setUpdatePostModal(true);
      setDeletePostModal(false);
    } else if (e.target.id === "delete") {
      setCreateCommentModal(false);
      setUpdatePostModal(false);
      setDeletePostModal(true);
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
        setCommentsModal(result.comments.reverse());
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
      <section>
        <div>
          <h2>POST</h2>
        </div>

        <article key={post._id}>
          <div>
            <NavLink to={`/profile/${post.creator}/${post.creator_id}`}>
              <small>{post.creator}</small>
            </NavLink>
            <h3>{post.title}</h3>
          </div>

          {/* <div>
            <img
              src={require(`../uploads/posts/user_${post.creator_id}/${post.imgUrl}`)}
              alt={post.title}
            ></img>
          </div> */}

          <div>
            <UpdatePostImage post={post} />
          </div>

          <div>
            <p>{post.message}</p>
          </div>

          <div>
            <LikeUnlike post={post} />
          </div>

          <div>
            <small>Création : {DateParser(post.createdAt)}</small>
            <small>Modification : {DateParser(post.updatedAt)}</small>
          </div>

          <div>
            <button
              onClick={handleModals}
              id="comment"
              className={createCommentModal ? "button--active" : "button"}
            >
              Commenter le post
            </button>
            <button
              onClick={handleModals}
              id="update"
              className={updatePostModal ? "button--active" : "button"}
            >
              Modifier le post
            </button>
            <button
              onClick={handleModals}
              id="delete"
              className={deletePostModal ? "button--active" : "button"}
            >
              Supprimer le post
            </button>
          </div>
        </article>

        {createCommentModal && <CreateComment post_id={id} />}
        {updatePostModal && <PostUpdate post={post} />}
        {deletePostModal && <PostDelete post_id={id} />}

        {commentsModal.map((comment) => (
          <aside key={comment._id}>
            <div>
              <small>{comment.commentator}</small>
              <h4>{comment.title}</h4>
            </div>

            <div>
              <p>{comment.content}</p>
            </div>

            <div>
              <small>Création : {DateParser(comment.createdAt)}</small>
            </div>

            <div>
              <DeleteComment post_id={id} comment_id={comment._id} />
            </div>
          </aside>
        ))}
      </section>
    );
  }
};
