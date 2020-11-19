import axios from "axios";
import { useEffect, useState } from "react";
import postStyle from "../../styles/posts.module.css";
import { connect } from "react-redux";
import * as funcsFromStore from '../../store/store';

const Post = ({storeId} : {storeId : String}) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://simple-blog-api.crew.red/posts/${storeId}?_embed=comments`
      )
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <section className={postStyle.openedPost}>
      <h1 className={postStyle.openedPostTilte}>{post?.title}</h1>
      <p className={postStyle.openedPostBody}>{post?.body}</p>
      <p className={postStyle.openedPostCommentsInfo}>
        commetns: {post?.comments?.length}
      </p>
      {
        post?.comments?.map(comment => (
          <p key={comment.body} className={postStyle.comment}>
            {comment.body}
          </p>
        ))
      }
    </section>
  );
}

const storeFuncs: { applyId: any } = {
  applyId: funcsFromStore.applyId,
};

const storeData = (action: { id: String }): { storeId: String } => ({
  storeId: action.id,
});

export default connect(storeData, storeFuncs)(Post);
