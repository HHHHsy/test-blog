import { PostEditor } from "@/components/admin/post-editor";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Compose</p>
        <h1 className="mt-3 font-serif text-5xl">New post</h1>
      </div>
      <PostEditor />
    </div>
  );
}
