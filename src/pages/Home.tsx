
import React from 'react';
import Navigation from '@/components/Navigation';
import Board from '@/components/Board';

const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 overflow-hidden">
        <Board />
      </main>
    </div>
  );
};

export default Home;
