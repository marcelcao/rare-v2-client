import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { getSingleUser, updateUser } from '../utils/data/userData';

function RegisterForm({ user, updateUserInfo }) {
  const initialState = {
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    profileImageUrl: '',
    createdOn: '',
    uid: user.uid,
  };
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user.uid) {
      getSingleUser(id).then((userObj) => {
        setFormData((prevState) => ({
          ...prevState,
          id: userObj.id,
          firstName: userObj.first_name,
          lastName: userObj.last_name,
          bio: userObj.bio,
          email: userObj.email,
          profileImageUrl: userObj.profile_image_url,
          createdOn: userObj.created_on,
        }));
        console.warn(userObj);
      });
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      const userInfo = {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        email: formData.email,
        profileImageUrl: formData.profileImageUrl,
        createdOn: formData.createdOn,
        uid: user.uid,
      };
      updateUser(userInfo, user.uid).then(() => router.push('/'));
    } else {
      registerUser(formData).then(() => updateUserInfo(user.uid));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control as="textarea" name="firstName" required value={formData.firstName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control as="textarea" name="lastName" required value={formData.lastName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="bio">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required value={formData.bio} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" name="email" required value={formData.email} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="profileImageUrl">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="url" name="profileImageUrl" required value={formData.profileImageUrl} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createdOn">
        <Form.Label>First Name</Form.Label>
        <Form.Control as="textarea" name="createdOn" placeholder="ex. 2023-11-17" required value={formData.createdOn} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  updateUserInfo: PropTypes.func,
};

RegisterForm.defaultProps = {
  updateUserInfo: () => {},
};

export default RegisterForm;
