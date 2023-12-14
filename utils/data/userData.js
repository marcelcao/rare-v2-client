import { clientCredentials } from '../client';

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateUser = (user, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${user.id}`, {
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

export {
  getSingleUser,
  updateUser,
};
