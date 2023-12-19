/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../utils/data/userData';
// import { clientCredentials } from '../../utils/client';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const { user, signOut } = useAuth();
  const router = useRouter();

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
      <div className="d-flex flex-column mt-5">
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
        &nbsp;
        &nbsp;
        <Button variant="success" className="signout-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}
