import { LatestPost } from "@/app/_components/post";
import { HydrateClient, api } from "@/trpc/server";
import PostList from "./_components/PostList";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();
  void api.post.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>
          <PostList />
          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
