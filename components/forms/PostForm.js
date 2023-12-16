import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost, getSinglePost } from '../../utils/data/postData';

const initialState = {
  title: '',
  imageUrl: '',
  content: '',
};

const PostForm = ({ postId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState(initialState);

  useEffect(() => {
    if (postId) {
      getSinglePost(postId).then((post) => {
        setCurrentPost({
          title: post.title,
          imageUrl: post.image_url,
          content: post.content,
        });
      });
    }
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: currentPost.title,
      imageUrl: currentPost.imageUrl,
      content: currentPost.content,
      uid: user.id,
    };

    if (postId) {
      // Update existing post
      await updatePost(postId, payload);
    } else {
      // Create a new post
      await createPost(payload);
    }

    router.push('/posts/post');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          placeholder="What's this post called?"
          required
          value={currentPost.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image Url</Form.Label>
        <Form.Control
          name="imageUrl"
          placeholder="Place your url here?"
          required
          value={currentPost.imageUrl}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          name="content"
          required
          value={currentPost.content}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">{postId ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
};

PostForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    uid: PropTypes.string,
  }),
  postId: PropTypes.number,
};

PostForm.defaultProps = {
  post: {
    id: 0,
    title: '',
    image_url: '',
    content: '',
  },
  postId: 0, // default value for postId
};

export default PostForm;
