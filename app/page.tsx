import PostCard from '@/app/components/PostCard';
import { Post } from './types/post';

async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      cache: 'force-cache', // แคชการตอบสนองเพื่อ SSG
    });
    return response.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto p-4">
      {posts.length === 0 ? (
        <p>ไม่มีโพสต์ให้แสดง</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} title={post.title} body={post.body} />
          ))}
        </div>
      )}
    </div>
  );
}
