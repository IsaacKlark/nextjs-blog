import formStyle from "../../styles/form.module.css";
import { useState, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyBody, setEmptyBody] = useState(false);

  const addNewPost = (e: FormEvent): void => {
    e.preventDefault();

    if (!title && !body) {
      setEmptyTitle(true);
      setEmptyBody(true);

      return;
    }

    if (!title) {
      setEmptyTitle(true);

      return;
    }

    if (!body) {
      setEmptyBody(true);
      
      return;
    }

    axios.get("https://simple-blog-api.crew.red/posts")
    .then(
      (res) => {
        const id : Number = res.data.sort((a, b) => {
          if (a.id > b.id) {
            return -1;
          } else {
            return 1;
          }
        })[0].id + 1;
      
        const post : {title : String, body: String, id : Number} = {title, body, id};
      
        axios.post('https://simple-blog-api.crew.red/posts', post)
          .then(res => {
            setTitle('');
            setBody('');
            alert('Post Created');
          })
          .catch(err => {alert('Error');})
      },
    ).catch(err => {alert(err)});
  };

  return (
    <>
      <h1 className={formStyle.postCreateHeader}>Type your post here:</h1>
      <form
        className={formStyle.postCreateWrapper}
        onSubmit={(e) => {
          addNewPost(e);
        }}
      >
        <input
          type="text"
          placeholder="Theme"
          value={title}
          tabIndex={1}
          onFocus={() => {setEmptyTitle(false)}}
          className={`${formStyle.postCreateInput} ${emptyTitle ? formStyle.error : null}`}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Type your text here"
          value={body}
          tabIndex={2}
          onFocus={() => {setEmptyBody(false)}}
          className={`${formStyle.postCreateTextArea} ${emptyBody ? formStyle.error : null}`}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className={formStyle.buttonsWrapper}>
          <button type="submit" className={formStyle.postCreateSubmit}>
            Create post
          </button>
          <Link href="/">
            <a className={formStyle.back}>
              Back
            </a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
