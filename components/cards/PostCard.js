import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';

const PostCard = ({
  id,
  userId,
  title,
  publicationDate,
  imageUrl,
  content,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const formattedDate = new Date(publicationDate).toLocaleDateString();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // fetching user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!title) {
    return (
      <Card className="post-card text-center">
        <Card.Body>
          <Card.Text>No post data available</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="post-card text-center">
      <Card.Header className="post-header" style={{ cursor: 'pointer' }}>
        <Link href={`/posts/${id}`} passHref>
          <Card.Text className="post-title-link">{title}</Card.Text>
        </Link>
      </Card.Header>
      <Card.Body>
        <Image className="post-img" src={imageUrl} alt={title} style={{ width: 'auto', height: 'auto' }} />
        <Link href={`/users/${user.id}`} passHref>
          <Card.Text className="post-user-link">
            by {user.first_name} {user.last_name}
          </Card.Text>
        </Link>
        <Card.Text className="post-date">{formattedDate}</Card.Text>
        <Card.Text className="post-content">{content}</Card.Text>
      </Card.Body>
      <Button
        className="view-btn"
        onClick={() => {
          router.push(`/posts/${id}`);
        }}
      >
        View Post
      </Button>
    </Card>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  userId: PropTypes.number,
  title: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PostCard;
