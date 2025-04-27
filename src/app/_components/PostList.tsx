"use client";
import { api } from "@/trpc/react";
import React from "react";

const PostList = () => {
  const [posts] = api.post.getAll.useSuspenseQuery();

  return (
    <div>
      Post List
      {posts.map((post) => (
        <div key={post.id}>{post.name}</div>
      ))}
    </div>
  );
};

export default PostList;
