/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image, Button } from 'react-bootstrap';
import { getSinglePost, deletePost } from '../../utils/data/postData';
import { getCommentsOnSinglePost } from '../../utils/data/commentData';
import { getSingleCategory } from '../../utils/data/categoryData';
import CommentCard from '../../components/cards/CommentCard';
import CommentForm from '../../components/forms/CommentForm';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../utils/data/userData';

function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [author, setAuthor] = useState([]);
  const [category, setCategory] = useState([]);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query ?? {};

  const getAllComments = () => {
    getCommentsOnSinglePost(id).then((data) => setComments(data));
  };

  const getPostCategory = () => {
    getSingleCategory(id).then((data) => setCategory(data));
  };

  const getPostAuthor = () => {
    getSingleUser(id).then((data) => setAuthor(data));
  };

  const deleteThisPost = () => {
    console.warn('Deleting post with ID:', id);
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => {
        router.push('/');
      });
    }
  };

  useEffect(() => {
    getSinglePost(id, user.uid)
      .then(setPostDetails)
      .then(getPostCategory)
      .then(getPostAuthor)
      .then(getAllComments);
  }, [id]);

  return (
    <>
      <Head>
        <title>{postDetails?.title}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap post-details-cont">
        <div className="d-flex flex-column post-details-cont" />
        <div className="text-white ms-5 details">
          <div className="post-details-cont">
            <div className="post-img-details">
              <Image src={postDetails?.image_url} alt={postDetails?.imageUrl} className="post-img-detail" />
            </div>
            <div className="post-content-cont">
              <h2 className="post-details-title">{postDetails?.title}</h2>
              <h2 className="post-details-text">By: {author.first_name} {author.last_name}</h2>
              <h2 className="post-details-text">Posted on: {postDetails?.publication_date}</h2>
              <h2 className="post-details-text">Category: {category.label}</h2>
              <h5 className="post-details-text post-content-detail">{postDetails?.content}</h5>
            </div>
            <div>{(postDetails.rare_user?.id === user.id) ? (<Button className="delete-button" variant="black" onClick={deleteThisPost}>Delete This Post</Button>) : ''}</div>
            <div>{(postDetails.rare_user?.id === user.id) ? (<Button className="delete-button" variant="black" href={`/posts/edit/${postDetails.id}`}>Edit This Post</Button>) : ''}</div>
          </div>
        </div>
      </div>
      <div className="post-details-cont">
        <h2 className="post-comment-title">Post Comment</h2>
        <CommentForm user={user} commentPostId={Number(id)} onSubmit={getAllComments} />
        {comments.map((comment) => (
          <section key={`comment--${comment.id}`} className="comment">
            <CommentCard
              id={comment.id}
              content={comment.content}
              authorId={comment.user}
              createdOn={comment.created_on}
              onUpdate={getAllComments}
            />
          </section>
        ))}
      </div>
    </>
  );
}

export default ViewPost;
