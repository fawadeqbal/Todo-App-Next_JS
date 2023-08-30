import React from 'react';
import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <UserProfile />
    </div>
  );
};

export default UserProfilePage;
