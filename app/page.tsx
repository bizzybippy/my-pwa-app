'use client';

import { useGetPostsQuery } from '@/app/lib/redux/services/apiSlice';
import PostCard from '@/app/components/PostCard';
import { Post } from './types/post';

export default function Home() {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  return (
    <div className="container mx-auto p-4">
      {isLoading && <p>กำลังโหลด...</p>}
      {error && (
        <p className="text-red-500">
          เกิดข้อผิดพลาดในการโหลดข้อมูล:
          {'status' in error
            ? `รหัสข้อผิดพลาด: ${error.status}`
            : (error as { message?: string }).message || 'อาจกำลังออฟไลน์'}
        </p>
      )}
      {!isLoading && !error && !posts && (
        <p>ไม่มีข้อมูล กรุณาเชื่อมต่ออินเทอร์เน็ตและลองใหม่</p>
      )}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post: Post) => (
            <PostCard key={post.id} title={post.title} body={post.body} />
          ))}
        </div>
      ) : (
        !isLoading && !error && <p>ไม่มีโพสต์ให้แสดง</p>
      )}
    </div>
  );
}
