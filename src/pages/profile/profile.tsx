import styles from './profile.module.css';
import { Outlet } from 'react-router-dom';
import ProfileNav from '../../components/profile-nav/profile-nav';

const ProfilePage = () => {
  return (
    <div className={`${styles.container} pb-10`}>
      <ProfileNav />
      <Outlet />
    </div>
  );
};

export default ProfilePage;
