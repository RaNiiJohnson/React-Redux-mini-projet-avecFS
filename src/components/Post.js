import React, { useState } from "react";
import Like from "./Like";
import { useSelector } from "react-redux/es/exports";
import { isEmpty } from "./Utils";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { deletePost, editPost } from "../actions/post.action";

const Post = ({ post }) => {
  const [editToggle, setEditToggle] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const [editContent, setEditContnet] = useState(post.content);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    const postData = {
      title: post.title,
      likes: user.pseudo,
      author: post.author,
      id: post.id,
      content: editContent,
    };

    dispatch(editPost(postData));
    setEditToggle(false);
  };

  return (
    <div className="post">
      {!isEmpty(user) && user.pseudo === post.author && (
        <div className="edit-delete">
          <img
            src="./icons/edit.svg"
            alt="edit"
            onClick={() => setEditToggle(!editToggle)}
          />
          <img
            src="./icons/delete.svg"
            alt="delete"
            onClick={() => dispatch(deletePost(post.id))}
          />
        </div>
      )}

      <h2>{post.title}</h2>
      <img
        src="https://picsum.photos/1500/400"
        className="post-img"
        alt="img-post"
      />

      {editToggle ? (
        <form onSubmit={(e) => handleEdit(e)}>
          <textarea
            autoFocus={true}
            defaultValue={post.content}
            onChange={(e) => setEditContnet(e.target.value)}
          ></textarea>
          <input type="submit" value="Valider modification" />
        </form>
      ) : (
        <p>{post.content}</p>
      )}

      <div className="author">
        <h5>{post.author}</h5>
        <Like post={post} />
      </div>
    </div>
  );
};

export default Post;
