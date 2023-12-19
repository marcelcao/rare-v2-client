import { clientCredentials } from '../client';

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateUser = (user, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(user),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
export {
  getSingleUser,
  updateUser,
  getAllUsers,
};
