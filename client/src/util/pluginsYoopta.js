import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import ActionMenu, { DefaultActionMenuRender } from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import Callout from "@yoopta/callout";
import Image from "@yoopta/image";
import Video from "@yoopta/video";
import Embed from "@yoopta/embed";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";

import {
    Bold,
    Italic,
    CodeMark,
    Underline,
    Strike,
    Highlight,
} from "@yoopta/marks";

export const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export const TOOLS = {
    Toolbar: {
        tool: Toolbar,
        render: DefaultToolbarRender,
    },
    ActionMenu: {
        tool: ActionMenu,
        render: DefaultActionMenuRender,
    },
    LinkTool: {
        tool: LinkTool,
        render: DefaultLinkToolRender,
    },
};

const uploadToCloudinary = async (file, resourceType = "image") => {
    const cloudName = "dmj4rosa8";
    const uploadPreset = "default-preset";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("resource_type", resourceType);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Cloudinary upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            src: data.secure_url,
            alt: file.name || "Uploaded image",
            sizes: {
                width: data.width,
                height: data.height,
            },
        };
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};

export const plugins = [
    Paragraph,
    Blockquote,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Callout,
    Image.extend({
        options: {
            maxSizes: { maxHeight: 300, maxWidth: 300 },
            async onUpload(file) {
                const result = await uploadToCloudinary(file, "image");
                return {
                    ...result,
                    sizes: {
                        width: Math.min(result.sizes.width, 300),
                        height: Math.min(result.sizes.height, 300),
                    },
                };
            },
        },
    }),
    Video,
    NumberedList,
    BulletedList,
    TodoList,
    Embed,
];
