// import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { signOut } from '../../utils/auth';

// function Home() {
//   const { user } = useAuth();
//   return (
//     <div
//       className="text-center d-flex flex-column justify-content-center align-content-center"
//       style={{
//         height: '90vh',
//         padding: '30px',
//         maxWidth: '400px',
//         margin: '0 auto',
//       }}
//     >
//       <h1>Hello {user.fbUser.displayName}! </h1>
//       <p>Your Bio: {user.bio}</p>
//       <p>Click the button below to logout!</p>
//       <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
//         Sign Out
//       </Button>
//     </div>
//   );
// }

// export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../utils/data/userData';
import { clientCredentials } from '../../utils/client';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const { user, signOut } = useAuth();
  const router = useRouter();

  const deleteUserProfile = () => {
    if (window.confirm('Are you sure you would like to delete your profile? You cannot undo this.')) {
      fetch(`${clientCredentials.databaseURL}/user/${user.id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          signOut();
        })
        .catch((error) => console.error('Delete Profile Error:', error));
    }
  };

  const updateUserProfile = () => {
    router.push(`/users/edit/${userDetails.id}`);
  };

  const getAUser = () => {
    getSingleUser(user.id).then((data) => setUserDetails(data));
  };

  useEffect(() => {
    getAUser(user.id);
  }, [user.id]);

  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <div className="d-flex flex-column mt-5"> {/* Add top margin */}
        <Image
          className="plant-image"
          src={userDetails.profile_image_url}
          alt={userDetails.name}
          style={{
            width: '300px', borderRadius: '0px', border: '3px solid #014415', boxShadow: '6px 6px rgb(216, 208, 208)',
          }}
        />
      </div>
      <div className="profile-font" style={{ marginTop: '35px' }}>
        <h2 className="post-details-title">{userDetails.first_name} {userDetails.last_name}</h2>
        <h5 className="post-details-title">{userDetails.email}</h5>
        <p className="post-details-text">Bio: {userDetails.bio} </p>
        <p className="post-content">Followers: {userDetails.subscription_count} </p>
        <Button className="sub-btn" onClick={updateUserProfile}>
          Update Profile
        </Button>
        <Button variant="danger" className="unsub-btn" onClick={deleteUserProfile}>
          Delete Profile
        </Button>
        <Button variant="success" className="signout-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}
