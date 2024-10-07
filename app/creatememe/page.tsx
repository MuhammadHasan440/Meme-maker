"use client";

import Image from 'next/image';
import React, { useRef, useState } from 'react';

const CreateMeme = ({ searchParams }: { searchParams: { id: string; url: string } }) => {
    const [meme, setMeme] = useState<string | null>(null);
    const text1 = useRef<HTMLInputElement>(null);
    const text2 = useRef<HTMLInputElement>(null);

    const createMeme = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=mabdullah6600&password=asdfgfdsa123&text0=${text1.current?.value}&text1=${text2.current?.value}`, {
            method: 'POST'
        });
        const response = await data.json();
        setMeme(response.data.url);
    }

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">Create Your Meme</h1>
            <Image src={searchParams.url} width={400} height={400} alt='meme' className="mb-4 rounded-lg shadow-lg" />

            <form onSubmit={createMeme} className="bg-red-600 text-black p-6 rounded-lg shadow-lg flex flex-col items-center">
                <input 
                    type="text" 
                    placeholder='Enter Top Text' 
                    ref={text1} 
                    className="border rounded px-4 py-2 mb-4 w-full max-w-xs"
                />
                <input 
                    type="text" 
                    placeholder='Enter Bottom Text' 
                    ref={text2} 
                    className="border rounded px-4 py-2 mb-4 w-full max-w-xs"
                />
                <button 
                    type='submit' 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Create Meme
                </button>
            </form>

            {meme && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Generated Meme:</h2>
                    <Image src={meme} width={400} height={400} alt='Generated meme' className="rounded-lg shadow-lg" />
                </div>
            )}
        </div>
    );
}

export default CreateMeme;
