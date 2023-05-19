import React, { useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useProfile } from '../../hooks/useProfile';
import './Profile.scss';

const Profile = () => {
    const { loading, user, fetchUserData } = useProfile();

    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        loading ? <LoadingSpinner /> :
            <div className="profile-container">
                <div className='profile'>
                    <h2 className="profile__name">{user?.name}</h2>
                    <h3 className="profile__email">{user?.email}</h3>
                </div>
            </div>
    );
}

export default Profile;
