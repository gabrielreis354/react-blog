import React from 'react'
import { PostCard } from '../PostCard';
import "./styles.css"

export const Posts = ({posts}) => {
  return (
    <div className="posts">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          cover={post.cover}
          title={post.title}
          body={post.body}
        />
      ))}
    </div>
  );
}
