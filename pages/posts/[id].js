/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postData';
import { getCommentsOnSinglePost } from '../../utils/data/commentData';
import CommentCard from '../../components/cards/CommentCard';
import CommentForm from '../../components/forms/CommentForm';
import { useAuth } from '../../utils/context/authContext';

function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query ?? {};

  const getAllComments = () => {
    getCommentsOnSinglePost(id).then((data) => setComments(data));
  };

  useEffect(() => {
    getSinglePost(id, user.uid)
      .then(setPostDetails)
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
              <h7 className="post-details-text">{postDetails?.publication_date}</h7>
              <h5 className="post-details-text post-content-detail">{postDetails?.content}</h5>
            </div>
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
              postId={comment.post_id}
              content={comment.content}
              authorId={comment.author_id}
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
