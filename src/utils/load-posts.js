import React from "react";

export const loadPosts = async () => {
  const postsResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const photosResponse = await fetch(
    "https://jsonplaceholder.typicode.com/photos"
  );

  const postsJson = await postsResponse.json();
  const photosJson = await photosResponse.json();

  const newUrlPhotos = photosJson.map((photo) => {
    return photo.url
      .replace("https://via.placeholder.com", "https://placehold.co")
      .concat("/png");
  });

  const postsAndPhotos = postsJson.map((post, index) => {
    return {
      ...post,
      cover: newUrlPhotos[index],
    };
  });

  return postsAndPhotos;
};
