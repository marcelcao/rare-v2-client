import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../utils/data/postData';
import { getCategories } from '../../utils/data/categoryData'; // Import the function to fetch categories

const initialState = {
  id: 0,
  title: '',
  imageUrl: '',
  content: '',
  publicationDate: '',
  categoryId: 0, // Add categoryId to the initial state
};

const PostForm = ({ postObj }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState(initialState);
  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    // Fetch categories when the component mounts
    getCategories().then(setCategories);

    if (postObj.id) {
      setCurrentPost({
        id: postObj.id,
        title: postObj.title,
        imageUrl: postObj.image_url,
        content: postObj.content,
        category: postObj.categoryId,
        rareUser: user.id,
      });
    }
  }, [postObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.id) {
      const payload = {
        id: currentPost.id,
        title: currentPost.title,
        imageUrl: currentPost.image_url,
        content: currentPost.content,
        categoryId: currentPost.category,
        publicationDate: currentPost.publication_date,
        rareUser: user.id,
      };
      console.warn({ payload });
      updatePost(currentPost.id, payload)
        .then(() => router.push('/'));
    } else {
      const payload = { ...currentPost, rareUser: user.id };
      console.warn('Payload:', payload);
      createPost(payload)
        .then(() => router.push('/'));
    }
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
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit">{postObj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
};

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    categoryId: PropTypes.number,
    rareUser: PropTypes.number,
    publicationDate: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  postObj: initialState,
};

export default PostForm;
