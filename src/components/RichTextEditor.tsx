"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import styles from "./RichTextEditor.module.scss"

interface Props {
  value?: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value = "", onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: styles.prosemirror,
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML()
      // Treat empty editor as empty string so we don't store "<p></p>"
      onChange(html === "<p></p>" ? "" : html)
    },
  })

  if (!editor) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? styles.active : ""}
          title="粗體"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? styles.active : ""}
          title="斜體"
        >
          <em>I</em>
        </button>
        <div className={styles.sep} />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? styles.active : ""}
          title="項目清單"
        >
          ≡
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? styles.active : ""}
          title="編號清單"
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? styles.active : ""}
          title="引用"
        >
          "
        </button>
        <div className={styles.sep} />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="復原"
        >
          ↩
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="取消復原"
        >
          ↪
        </button>
      </div>
      <EditorContent editor={editor} className={styles.editorContent} />
      {!editor.getText() && placeholder && (
        <p className={styles.placeholder}>{placeholder}</p>
      )}
    </div>
  )
}
