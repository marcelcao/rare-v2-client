import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost, getSinglePost } from '../../utils/data/postData';
import { getCategories } from '../../utils/data/categoryData'; // Import the function to fetch categories

const initialState = {
  title: '',
  imageUrl: '',
  content: '',
  categoryId: '', // Add categoryId to the initial state
};

const PostForm = ({ postId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState(initialState);
  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    // Fetch categories when the component mounts
    getCategories().then(setCategories);

    if (postId) {
      getSinglePost(postId).then((post) => {
        setCurrentPost({
          title: post.title,
          imageUrl: post.image_url,
          content: post.content,
          categoryId: post.category.id, // Set the categoryId from the fetched post
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
      categoryId: currentPost.categoryId,
      uid: user.id,
      publicationDate: new Date().toISOString(),
      approved: true, // You can set the default value according to your requirements
    };

    if (postId) {
      // Update existing post
      await updatePost(postId, payload);
    } else {
      // Create a new post
      await createPost(payload);
    }

    router.push('/');
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
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="categoryId"
          value={currentPost.categoryId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit">{postId ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
};

PostForm.propTypes = {
  postId: PropTypes.number,
};

PostForm.defaultProps = {
  postId: 0,
};

export default PostForm;
