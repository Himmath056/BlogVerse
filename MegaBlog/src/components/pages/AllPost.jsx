import React, { useState, useEffect } from 'react';
import appwriteService from '../../appwrite/conf';
import { Container, PostCard } from '../index';

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]) // Assuming getPosts takes parameters
      .then((response) => {
        if (response) {
          setPosts(response.documents); // Ensure `documents` is an array
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error); // Handle potential errors
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
