import formStyle from "../styles/form.module.css";
import Link from "next/link";
import { GetStaticProps } from "next";
import axios from "axios";
import { useState, useEffect } from "react";
import postsStyle from "../styles/posts.module.css";
import { connect } from "react-redux";
import * as funcsFromStore from "../store/store";

const Home = ({ applyId }: { applyId: any }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://simple-blog-api.crew.red/posts")
      .then((res) => {
        setPosts(
          res.data.sort((a, b) => {
            if (a.id > b.id) {
              return -1;
            } else {
              return 1;
            }
          })
        );
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <section className={formStyle.wrapper}>
      <Link href={`/posts/new`}>
        <a className={formStyle.link}>Create post</a>
      </Link>
      <h2 className={formStyle.postCreateHeader}>Posts</h2>
      {posts.map((post) => {
        if (post.title && post.body) {
          return (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <a className={postsStyle.postLink} onClick={() => {applyId(post.id)}}>
                <div className={postsStyle.post}>
                  <h3 className={postsStyle.postTitle}>{post.title}</h3>
                  <p className={postsStyle.postBody}>{post.body}</p>
                </div>
              </a>
            </Link>
          );
        }
        return null;
      })}
    </section>
  );
};

const storeFuncs: { applyId: any } = {
  applyId: funcsFromStore.applyId,
};

const storeData = (action: { id: String }): { storeId: String } => ({
  storeId: action.id,
});

export default connect(storeData, storeFuncs)(Home);
