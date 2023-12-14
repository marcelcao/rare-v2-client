import { clientCredentials } from '../client';

const getComments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createCommentOnPost = (uid, id, comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}/post_comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Create Comment Error:', error);
      reject(error);
    });
});

const updateComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then(resolve)
    .catch(reject);
});

const getSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteComment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}`, {
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

const getCommentsOnSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}/comments`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getComments,
  createCommentOnPost,
  updateComment,
  getSingleComment,
  deleteComment,
  getCommentsOnSinglePost,
};
