import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getPosts } from '../utils/data/postData';
import PostCard from '../components/cards/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

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
              obj={post}
              onUpdate={showPosts}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
