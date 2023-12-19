import { clientCredentials } from '../client';

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createPost = (post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Error: Post not Created:', error);
      reject(error);
    });
});

const updatePost = (id, currentPost) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentPost),
  })
    .then(resolve)
    .catch(reject);
});

const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.warn('Error retrieving post:', error);
      reject(error);
    });
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getPosts,
  createPost,
  updatePost,
  getSinglePost,
  deletePost,
};
