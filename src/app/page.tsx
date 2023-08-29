import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Parallel lines have so much in common. It's a shame they'll never meet.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">Welcome to My Website</h1>
      <p className="mb-6">
        This is a sample website created using Next.js and Tailwind CSS. Enjoy some jokes below!
      </p>
      <div className="space-y-4">
        {jokes.map((joke, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded">
            <p>{joke}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/todo"className="text-blue-500 underline">Go to Todo Page
        </Link>
      </div>
    </div>
  );
};

export default Home;
