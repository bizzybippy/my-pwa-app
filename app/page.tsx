'use client';

import { useGetPostsQuery } from '@/app/lib/redux/services/apiSlice';
import PostCard from '@/app/components/PostCard';
import { Post } from './types/post';

export default function Home() {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  return (
    <div className="container mx-auto p-4">
      {isLoading && <p>กำลังโหลด...</p>}
      {error && <p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post: Post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))}
      </div>
    </div>
  );
}
