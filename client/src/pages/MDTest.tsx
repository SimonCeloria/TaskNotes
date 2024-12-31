import React, { useMemo, useState } from "react";
import YooptaEditor, {
    createYooptaEditor,
    YooptaContentValue,
    YooptaOnChangeOptions,
} from "@yoopta/editor";
import { plugins, MARKS, TOOLS } from "../util/pluginsYoopta";

const Editor = () => {
    const editor = useMemo(() => createYooptaEditor(), []);
    const [value, setValue] = useState<YooptaContentValue>();

    const onChange = (
        value: YooptaContentValue,
        options: YooptaOnChangeOptions
    ) => {
        setValue(value);
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
                    {/* Example button, you can add more actions */}
                    <button
                        // onClick={onSaveToServer}
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Save
                    </button>
                    <button
                        //onClick={clearEditor}
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
