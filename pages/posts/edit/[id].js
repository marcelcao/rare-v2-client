import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PostForm from '../../../components/forms/PostForm';
import { getSinglePost } from '../../../utils/data/postData';

export default function EditPost() {
  const [post, setPost] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10); // Parse id as an integer
      getSinglePost(parsedId).then(setPost);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Update {post.title}</title>
      </Head>
      <PostForm postId={post.id} />
    </>
  );
}
