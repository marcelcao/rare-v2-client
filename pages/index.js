// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

// function Home() {
//   const { user } = useAuth();
//   return (
//     <div
//       className="text-center d-flex flex-column justify-content-center align-content-center"
//       style={{
//         height: '90vh',
//         padding: '30px',
//         maxWidth: '400px',
//         margin: '0 auto',
//       }}
//     >
//       <h1>Hello {user.fbUser.displayName}! </h1>
//       <p>Your Bio: {user.bio}</p>
//       <p>Click the button below to logout!</p>
//       <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
//         Sign Out
//       </Button>
//     </div>
//   );
// }

// export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getPosts } from '../utils/data/postData';
import PostCard from '../components/cards/PostCard';

// import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  // const { user } = useAuth();

  const showPosts = () => {
    getPosts().then((data) => setPosts(data));
  };
  useEffect(() => {
    showPosts();
  }, []);

  return (
    <>
      <div className="post-header">
        <h1 className="welcome-text">Posts</h1>
        <Button
          className="register-btn"
          onClick={() => {
            router.push('/posts/new');
          }}
        >
          Register New Post
        </Button>
      </div>
      <hr />
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {posts.map((post) => (
          <div key={`post--${post.id}`} className="post">
            <PostCard
              id={post.id}
              userId={post.user_id}
              title={post.title}
              imageUrl={post.image_url}
              publicationDate={post.publication_date}
              content={post.content}
              onUpdate={showPosts}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
