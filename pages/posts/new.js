import PostForm from '../../components/forms/PostForm';
import { useAuth } from '../../utils/context/authContext';

const NewPost = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Create New Post</h2>
      <PostForm user={user} />
    </div>
  );
};

export default NewPost;
