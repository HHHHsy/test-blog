import { mergeAttributes, Node } from "@tiptap/core";

export const VideoNode = Node.create({
  name: "videoBlock",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      title: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "video[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      { "data-media": "video" },
      [
        "video",
        mergeAttributes(HTMLAttributes, {
          controls: "true",
          preload: "metadata",
        }),
      ],
    ];
  },
});

export const AttachmentNode = Node.create({
  name: "attachment",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      href: { default: null },
      title: { default: "Download file" },
      mimeType: { default: null },
      size: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "a[data-attachment]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const title = HTMLAttributes.title || "Download file";
    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        "data-attachment": "true",
        href: HTMLAttributes.href,
        target: "_blank",
        rel: "noopener noreferrer",
      }),
      ["span", {}, title],
    ];
  },
});
