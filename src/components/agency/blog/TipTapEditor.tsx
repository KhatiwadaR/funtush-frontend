"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { useTheme } from "@/context/theme";
import { useState, useRef, useEffect } from "react";

// Material UI Icons
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface TipTapEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export function TipTapEditor({ content, onChange }: TipTapEditorProps) {
    const { isDark } = useTheme();
    const [isParagraphOpen, setIsParagraphOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-blue-500 underline cursor-pointer' },
            }),
            Image.configure({ HTMLAttributes: { class: 'max-w-full h-auto rounded-lg my-2' } }),
            Youtube.configure({ width: 480, height: 270, HTMLAttributes: { class: 'aspect-video rounded-lg my-2 mx-auto max-w-full' } }),
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsParagraphOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!editor) return null;

    const addLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = prompt("Enter target hyperlink destination URL:", previousUrl);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = prompt("Enter complete asset source Image URL:");
        if (url) editor.chain().focus().setImage({ src: url }).run();
    };

    const getCurrentBlockLabel = () => {
        if (editor.isActive("heading", { level: 1 })) return "Heading 1";
        if (editor.isActive("heading", { level: 2 })) return "Heading 2";
        if (editor.isActive("heading", { level: 3 })) return "Heading 3";
        return "Paragraphs";
    };

    // Dynamic classes without borders on the outer card container
    const containerClass = isDark
        ? "bg-[#0d1b32] text-slate-200"
        : "bg-white text-neutral-800 border border-neutral-300 shadow-sm";

    const toolbarContainerClass = isDark
        ? "bg-[#111B3A] border-b border-[#1E293B]"
        : "bg-neutral-50 border-b border-neutral-200";

    const dropdownButtonClass = isDark
        ? "bg-[#162947] hover:bg-[#1f365c] text-slate-300 border-[#233a5e]"
        : "bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-300 shadow-sm";

    const dropdownMenuClass = isDark
        ? "bg-[#162947] border-[#233a5e]"
        : "bg-white border-neutral-200 shadow-md";

    const dropdownItemClass = isDark
        ? "text-slate-300 hover:bg-[#1f365c]"
        : "text-neutral-700 hover:bg-neutral-100";

    const dividerClass = isDark ? "bg-[#233a5e]" : "bg-neutral-200";

    const activeToolClass = isDark ? "bg-[#1f365c] text-white" : "bg-neutral-200 text-neutral-900";
    const inactiveToolClass = isDark
        ? "text-slate-400 hover:bg-[#162947] hover:text-slate-200"
        : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900";

    return (
        <div className={`rounded-xl overflow-hidden transition-colors duration-200 ${containerClass}`}>
            {/* Toolbar Container */}
            <div className={`p-2 flex flex-wrap gap-1.5 items-center justify-between select-none ${toolbarContainerClass}`}>
                
                {/* Left side formatting controls */}
                <div className="flex flex-wrap gap-1.5 items-center">
                    
                    {/* Paragraph / Heading Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsParagraphOpen(!isParagraphOpen)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${dropdownButtonClass}`}
                        >
                            <span>{getCurrentBlockLabel()}</span>
                            <KeyboardArrowDownIcon style={{ fontSize: 16 }} className="text-neutral-400" />
                        </button>

                        {isParagraphOpen && (
                            <div className={`absolute left-0 mt-1 w-36 border rounded-lg shadow-xl z-20 py-1 ${dropdownMenuClass}`}>
                                <button
                                    type="button"
                                    onClick={() => { editor.chain().focus().setParagraph().run(); setIsParagraphOpen(false); }}
                                    className={`w-full text-left px-3 py-1.5 text-xs ${dropdownItemClass} ${editor.isActive("paragraph") ? "text-blue-500 font-semibold" : ""}`}
                                >
                                    Paragraph
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setIsParagraphOpen(false); }}
                                    className={`w-full text-left px-3 py-1.5 text-xs font-bold ${dropdownItemClass} ${editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""}`}
                                >
                                    Heading 1
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setIsParagraphOpen(false); }}
                                    className={`w-full text-left px-3 py-1.5 text-xs font-bold ${dropdownItemClass} ${editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""}`}
                                >
                                    Heading 2
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setIsParagraphOpen(false); }}
                                    className={`w-full text-left px-3 py-1.5 text-xs font-bold ${dropdownItemClass} ${editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""}`}
                                >
                                    Heading 3
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={`w-[1px] h-5 mx-1 ${dividerClass}`} />

                    {/* Bold */}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-1.5 rounded-lg transition-colors ${editor.isActive("bold") ? activeToolClass : inactiveToolClass}`}
                        title="Bold"
                    >
                        <FormatBoldIcon style={{ fontSize: 18 }} />
                    </button>

                    {/* Italic */}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-1.5 rounded-lg transition-colors ${editor.isActive("italic") ? activeToolClass : inactiveToolClass}`}
                        title="Italic"
                    >
                        <FormatItalicIcon style={{ fontSize: 18 }} />
                    </button>

                    {/* Strikethrough */}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`p-1.5 rounded-lg transition-colors ${editor.isActive("strike") ? activeToolClass : inactiveToolClass}`}
                        title="Strikethrough"
                    >
                        <FormatStrikethroughIcon style={{ fontSize: 18 }} />
                    </button>

                    {/* Bullet List */}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-1.5 rounded-lg transition-colors ${editor.isActive("bulletList") ? activeToolClass : inactiveToolClass}`}
                        title="Bullet List"
                    >
                        <FormatListBulletedIcon style={{ fontSize: 18 }} />
                    </button>

                    {/* Ordered List */}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-1.5 rounded-lg transition-colors ${editor.isActive("orderedList") ? activeToolClass : inactiveToolClass}`}
                        title="Ordered List"
                    >
                        <FormatListNumberedIcon style={{ fontSize: 18 }} />
                    </button>

                    {/* Blockquote */}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`p-1.5 rounded-lg transition-colors ${editor.isActive("blockquote") ? activeToolClass : inactiveToolClass}`}
                        title="Blockquote"
                    >
                        <FormatQuoteIcon style={{ fontSize: 18 }} />
                    </button>

                    {/* Link */}
                    <button
                        type="button"
                        onClick={addLink}
                        className={`p-1.5 rounded-lg transition-colors ${editor.isActive("link") ? activeToolClass : inactiveToolClass}`}
                        title="Insert Link"
                    >
                        <LinkIcon style={{ fontSize: 18 }} />
                    </button>

                    {/* Image */}
                    <button
                        type="button"
                        onClick={addImage}
                        className={`p-1.5 rounded-lg transition-colors ${editor.isActive("image") ? activeToolClass : inactiveToolClass}`}
                        title="Insert Image"
                    >
                        <ImageIcon style={{ fontSize: 18 }} />
                    </button>
                </div>

                {/* Right side history & extra controls */}
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className={`p-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent ${inactiveToolClass}`}
                        title="Undo"
                    >
                        <UndoIcon style={{ fontSize: 18 }} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className={`p-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent ${inactiveToolClass}`}
                        title="Redo"
                    >
                        <RedoIcon style={{ fontSize: 18 }} />
                    </button>
                    <button
                        type="button"
                        className={`p-1.5 rounded-lg transition-colors ${inactiveToolClass}`}
                        title="More options"
                    >
                        <MoreVertIcon style={{ fontSize: 18 }} />
                    </button>
                </div>
            </div>

            {/* Editor Content Area */}
            <EditorContent
                editor={editor}
                className={`prose prose-sm max-w-none p-4 min-h-[250px] focus:outline-none focus:ring-0 focus-visible:outline-none leading-relaxed font-normal ${
                    isDark ? "prose-invert text-slate-300" : "text-neutral-800"
                } [&_.is-editor-empty:first-child::before]:text-neutral-400 [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:pointer-events-none`}
            />
        </div>
    );
}