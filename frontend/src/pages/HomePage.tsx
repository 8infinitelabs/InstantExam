import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">Métrica 1</div>
        <div className="bg-white p-6 rounded-lg shadow">Métrica 2</div>
        <div className="bg-white p-6 rounded-lg shadow">Últimos Exámenes</div>
      </div>
    </div>
  );
};

export default HomePage;
