import UserProfile from '@/components/dashboard/user/UserProfile';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const UserProfilePage = async () => {
     const user = await getUserSession();
    return (
        <div className="p-6">
      <UserProfile user={user} />
    </div>
    );
};

export default UserProfilePage;