import { notFound } from "next/navigation";
import { getAdminPost } from "@/lib/data";
import { PostEditor } from "@/components/admin/post-editor";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getAdminPost(id);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Edit</p>
        <h1 className="mt-3 font-serif text-5xl">Post</h1>
      </div>
      <PostEditor post={post} />
    </div>
  );
}
