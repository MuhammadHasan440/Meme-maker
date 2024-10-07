import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Meme {
  id: string;
  name: string;
  url: string;
}

const Page = async () => {
  const data = await fetch('https://api.imgflip.com/get_memes');
  const response = await data.json();
  
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-4xl font-bold my-8">Meme Generator</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {response.data.memes.map((item: Meme) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-red-600 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <Image 
                src={item.url}
                alt={item.name}
                width={350}
                height={350}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
              <button><Link href={{
              pathname: "creatememe",
              query: {
                url: item.url,
                id: item.id
              }
            }}>generate Meme</Link></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-red-700 p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Meme Generator</h1>
      </div>
    </nav>
  );
};

export default Page;