// /* eslint-disable react/require-default-props */
// /* eslint-disable react/forbid-prop-types */
// /* eslint-disable @next/next/no-img-element */
// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import { Button, Card, Image } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { deletePost, getSinglePost } from '../../utils/data/postData';
// import { useAuth } from '../../utils/context/authContext';

// const PostCard = ({
//   id, userId, title, publicationDate, imageUrl, content, onUpdate,
// }) => {
//   const router = useRouter();
//   const { user } = useAuth();
//   const isCurrentUserPost = user && user.id === userId.id;
//   const formattedDate = new Date(publicationDate).toLocaleDateString();
//   const [userDetails, setUserDetails] = useState(userId);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userData = await getSinglePost(userId.id);
//         setUserDetails(userData);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [userId.id]);

//   const deleteThisPost = () => {
//     console.warn('Deleting post with ID:', id);
//     if (window.confirm('Delete Post?')) {
//       deletePost(id).then(() => onUpdate());
//     }
//   };

//   if (!title) {
//     // Renders a message when post data is not available
//     return (
//       <Card className="post-card text-center">
//         <Card.Body>
//           <Card.Text>No post data available</Card.Text>
//         </Card.Body>
//       </Card>
//     );
//   }

//   return (
//     <Card className="post-card text-center">
//       <Card.Header className="post-header" style={{ cursor: 'pointer' }}>
//         {isCurrentUserPost ? (
//           <Button className="delete-btn" onClick={deleteThisPost}>
//             x
//           </Button>
//         ) : null}
//         <Link href={`/posts/${id}`} passHref>
//           <Card.Text className="post-title-link">{title}</Card.Text>
//         </Link>
//       </Card.Header>
//       <Card.Body>
//         <Image className="post-img" src={imageUrl} alt={title} style={{ width: 'auto', height: 'auto' }} />
//         <Link href={`/rareUsers/${userDetails.id}`} passHref>
//           <Card.Text className="post-user-link">
//             by {userDetails.first_name} {userDetails.last_name}
//           </Card.Text>
//         </Link>
//         <Card.Text className="post-date">{formattedDate}</Card.Text>
//         <Card.Text className="post-content">{content}</Card.Text>
//       </Card.Body>
//       {isCurrentUserPost ? (
//         <>
//           <Button
//             className="edit-btn"
//             onClick={() => {
//               router.push(`/posts/edit/${id}`);
//             }}
//           >
//             Edit Post
//           </Button>
//         </>
//       ) : null}
//     </Card>
//   );
// };

// PostCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   userId: PropTypes.object.isRequired,
//   title: PropTypes.string,
//   publicationDate: PropTypes.string,
//   imageUrl: PropTypes.string,
//   content: PropTypes.string,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default PostCard;

// REFACTOR BELOW:
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deletePost, getSinglePost } from '../../utils/data/postData';
import { useAuth } from '../../utils/context/authContext';

const PostCard = ({
  id, userId, title, publicationDate, imageUrl, content, onUpdate,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const isCurrentUserPost = user && userId && user.id === userId.id;
  const formattedDate = new Date(publicationDate).toLocaleDateString();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getSinglePost(userId.id);
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId && userId.id) {
      fetchUserData();
    }
  }, [userId]);

  const deleteThisPost = () => {
    console.warn('Deleting post with ID:', id);
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => onUpdate());
    }
  };

  if (!title) {
    // Renders a message when post data is not available
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
        {isCurrentUserPost ? (
          <Button className="delete-btn" onClick={deleteThisPost}>
            x
          </Button>
        ) : null}
        <Link href={`/posts/${id}`} passHref>
          <Card.Text className="post-title-link">{title}</Card.Text>
        </Link>
      </Card.Header>
      <Card.Body>
        <Image className="post-img" src={imageUrl} alt={title} style={{ width: 'auto', height: 'auto' }} />
        <Link href={`/rareUsers/${userDetails.id}`} passHref>
          <Card.Text className="post-user-link">
            by {userDetails.first_name} {userDetails.last_name}
          </Card.Text>
        </Link>
        <Card.Text className="post-date">{formattedDate}</Card.Text>
        <Card.Text className="post-content">{content}</Card.Text>
      </Card.Body>
      {isCurrentUserPost ? (
        <>
          <Button
            className="edit-btn"
            onClick={() => {
              router.push(`/posts/edit/${id}`);
            }}
          >
            Edit Post
          </Button>
        </>
      ) : null}
    </Card>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.object.isRequired,
  title: PropTypes.string,
  publicationDate: PropTypes.string,
  imageUrl: PropTypes.string,
  content: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
