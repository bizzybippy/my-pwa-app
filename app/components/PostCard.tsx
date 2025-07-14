interface PostCardProps {
  title: string;
  body: string;
}

export default function PostCard({ title, body }: PostCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold text-primary">{title}</h2>
      <p className="mt-2 text-secondary">{body}</p>
    </div>
  );
}
