import { getAllReviews } from '@/lib/api/reviews';
import React from 'react';
import UserReviews from './UserReviews';

const UserReviewsSection = async () => {
    const reviews = await getAllReviews()
    return (
        <div>
           <UserReviews reviews={reviews} />
        </div>
    );
};

export default UserReviewsSection;