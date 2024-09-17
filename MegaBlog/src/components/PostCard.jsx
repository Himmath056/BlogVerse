import React from 'react';
import appwriteService from "../appwrite/conf";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : 'path/to/placeholder-image.jpg'; // Use a placeholder if no image is available
    console.log(appwriteService.getFilePreview(featuredImage));

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        {featuredImage && (
          <div className="w-full justify-center mb-4">
            <img src={imageUrl} alt={title || "Post Image"} className="rounded-xl" />
          </div>
        )}
        <h2 className="text-xl font-bold">
          {title || "Untitled Post"}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
