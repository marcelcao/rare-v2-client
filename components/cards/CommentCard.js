/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteComment } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../utils/data/userData';

export default function CommentCard({
  id,
  authorId,
  content,
  createdOn,
  onUpdate,
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [commentUser, setCommentUser] = useState({});

  const deleteCommentCard = () => {
    if (window.confirm('Do you want to delete this comment?')) {
      deleteComment(id).then(() => onUpdate());
    }
  };
  // note: aid = author id
  const getCommentUser = async (aid) => {
    try {
      const commentUserData = await getSingleUser(aid);
      setCommentUser(commentUserData);
    } catch (error) {
      console.error('Error fetching comment user:', error);
    }
  };

  useEffect(() => {
    getCommentUser(authorId);
  }, [authorId]);

  return (
    <Card className="comment-card text-center">
      <Card.Body>
        <Card.Title className="comment-card-title">

          <div className="display-row">
            <Card.Img className="comment-profile-pic" src={commentUser.profile_image_url} />
            <div className="comment-user-cont">
              <Card.Link className="comment-username" href={`/rareUsers/${commentUser.id}`}>Comment by: {commentUser.first_name} {commentUser.last_name}</Card.Link>
              <Card.Text className="comment-created">Posted On: {createdOn}</Card.Text>
            </div>
          </div>
          <div>{(user.id === authorId) ? (<Button className="delete-button" variant="black" onClick={deleteCommentCard}>Delete Comment</Button>) : ''}</div>

        </Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      {(user.id === authorId) ? (<Button className="view-edit-btn" variant="black" onClick={(e) => router.replace(`/comments/edit/${id}`)}>Edit Comment</Button>) : ''}
    </Card>
  );
}

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  createdOn: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
