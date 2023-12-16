import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleUser } from '../../../utils/data/userData';
import RegisterForm from '../../../components/RegisterForm';

export default function EditProfile() {
  const [editProfile, setEditProfile] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setEditProfile);
  }, [id]);

  return (
    <div>
      <h1>Edit Profile</h1>
      <RegisterForm user={editProfile} />
    </div>
  );
}
