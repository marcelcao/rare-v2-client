import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../utils/data/postData';

export default function PostCard({ obj, userId, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();
  // const formattedDate = new Date(publicationDate).toLocaleDateString();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // fetching user data
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   if (userId) {
  //     fetchUserData();
  //   }
  // }, [userId]);

  // if (!title) {
  //   return (
  //     <Card className="post-card text-center">
  //       <Card.Body>
  //         <Card.Text>No post data available</Card.Text>
  //       </Card.Body>
  //     </Card>
  //   );
  // }

  const isCurrentUserPost = user && user.id === userId;

  const deleteThisPost = () => {
    console.warn('Deleting post with ID:', userId);
    if (window.confirm('Delete Post?')) {
      deletePost(userId).then(() => onUpdate());
    }
  };

  return (
    <Card className="post-card text-center">
      <Card.Header className="post-header" style={{ cursor: 'pointer' }}>
        {isCurrentUserPost ? (
          <Button className="delete-btn" onClick={deleteThisPost}>
            x
          </Button>
        ) : null}
        <Link href={`/posts/${obj.id}`} passHref>
          <Card.Text className="post-title-link">{obj.title}</Card.Text>
        </Link>
      </Card.Header>
      <Card.Header className="post-header" style={{ cursor: 'pointer' }}>
        <Card.Text className="post-title-link">{obj.title}</Card.Text>
      </Card.Header>
      <Card.Body>
        <Image className="post-img" src={obj.image_url} alt={obj.title} style={{ width: 'auto', height: 'auto' }} />
        <Card.Text className="post-user-link">
          by {obj.rare_user}
        </Card.Text>
        <Card.Text className="post-date">Posted on: {obj.publication_date}</Card.Text>
        <Card.Text className="comment-count"> {obj.comment_count} Comments</Card.Text>

      </Card.Body>
      <Button
        className="view-btn"
        onClick={() => {
          router.push(`/posts/${obj.id}`);
        }}
      >
        View Post
      </Button>
    </Card>
  );
}

PostCard.propTypes = {
  userId: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    publication_date: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    comment_count: PropTypes.number.isRequired,
    rare_user: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
