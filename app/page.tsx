"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import Canvas from "./Canvas";
import ChatInterface from "./ChatInterface";

interface responseInterface {
    text: string;
    html?: string;
    css?: string;
    js?: string;
}

export default function Home() {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");

    const { messages, input, handleInputChange, handleSubmit } = useChat({});

    const messageJson = (jsonString: string) => {
        try {
            const res = JSON.parse(jsonString);

            const response: responseInterface = {
                text: res.text,
                html: res.html,
                css: res.css,
                js: res.js,
            };

            setHtml(response.html || "");
            setCss(response.css || "");
            setJs(response.js || "");

            return response;
        } catch (err) {
            console.error("Error parsing JSON:", err);
            return null;
        }
    };

    return (
        <main className="bg-primary p-4 rounded-md text-center text-xl m-6 font-medium flex flex-row h-[90vh]">
            <Canvas html={html} css={css} js={js} />

            <div className="flex flex-col items-start justify-start border-2 border-secondary w-1/4 m-2 rounded-xl text-white">
                <div className="flex flex-row justify-between w-full">
                    <h1 className="m-3">Chat</h1>
                </div>
                <ChatInterface
                    messages={messages}
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    messageJson={messageJson}
                />
            </div>
        </main>
    );
}
