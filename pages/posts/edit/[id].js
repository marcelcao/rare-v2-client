import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});

  useEffect(() => {
    getSinglePost(id).then(setPost);
  }, [id]);

  return <PostForm postObj={post} />;
}
