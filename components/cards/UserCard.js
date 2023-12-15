import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const UserCard = ({
  id,
  firstName,
  lastName,
  bio,
  profileImageUrl,
  email,
}) => {
  const router = useRouter();

  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={profileImageUrl} />
      <Card.Body>
        <Card.Title className="post-title-link">{firstName} {lastName}</Card.Title>
        <Card.Subtitle className="post-content">Email: {email}</Card.Subtitle>
        <Card.Text className="post-content">{bio}</Card.Text>
        <Button
          className="view-btn"
          onClick={() => {
            router.push(`rareUsers/${id}`);
          }}
        >
          View Profile
        </Button>
      </Card.Body>
    </Card>
  );
};

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default UserCard;
