import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfileSkeleton = (props) => {
  return (
    <ContentLoader
      speed={1}
      width={400}
      height={500}
      viewBox="0 0 200 200"
      backgroundColor="#ecebeb"
      foregroundColor="#ffffff"
      {...props}
    >
      <rect x="55" y="130" rx="3" ry="3" width="88" height="6" />
      <rect x="70" y="140" rx="3" ry="3" width="62" height="6" />
      <rect x="80" y="150" rx="3" ry="3" width="42" height="6" />
      <rect x="0" y="170" rx="10" ry="10" width="200" height="20" />
      <circle cx="100" cy="70" r="50" />
    </ContentLoader>
  );
};

export default ProfileSkeleton;
