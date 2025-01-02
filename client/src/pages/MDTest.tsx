import React, { useMemo, useState, useEffect } from "react";
import YooptaEditor, {
    createYooptaEditor,
    YooptaContentValue,
    YooptaOnChangeOptions,
} from "@yoopta/editor";
import { plugins, MARKS, TOOLS } from "../util/pluginsYoopta";
import { updateDescription, getTask } from "../api/tasks.api";
import { markdown } from "@yoopta/exports";

const Editor = () => {
    const editor = useMemo(() => createYooptaEditor(), []);
    const [value, setValue] = useState<YooptaContentValue | undefined>(
        undefined
    );
    const onChange = (
        value: YooptaContentValue,
        options: YooptaOnChangeOptions
    ) => {
        setValue(value);
    };

    useEffect(() => {
        const fetchInitialContent = async () => {
            try {
                const response = await getTask(31);
                console.log("Response:", response);
                const markdownString = await response.data.description;
                console.log("Initial content:", markdownString);
                if (markdownString) {
                    const value = markdown.deserialize(editor, markdownString);
                    editor.setEditorValue(value);
                }
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        };

        fetchInitialContent();
    }, []);

    const onSaveToServer = async () => {
        const editorContent = editor.getEditorValue();
        const markdownString = markdown.serialize(editor, editorContent);
        console.log("Saving content and show:", markdownString);

        try {
            const response = await updateDescription(markdownString, 31); //task 30
            if (response) {
                console.log("Document saved successfully");
            } else {
                console.error("Error saving document");
            }
        } catch (error) {
            console.error("Error saving content:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-pink-300">
            <div
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl"
                style={{ backgroundImage: "url(/fondos/dog_and_cat.svg)" }}
            >
                <div className="relative text-black border-black border-2 rounded-lg">
                    <YooptaEditor
                        editor={editor}
                        placeholder="Start typing here..."
                        value={value}
                        onChange={onChange}
                        plugins={plugins}
                        tools={TOOLS}
                        marks={MARKS}
                        className="border rounded-lg p-4 min-w-full bg-pink-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                    <button
                        onClick={onSaveToServer}
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Save
                    </button>
                    <button
                        // Aquí puedes agregar la función de limpiar
                        className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Editor;
