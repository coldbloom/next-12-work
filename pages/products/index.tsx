import React from 'react';

const Index = () => {
  const [counter, setCounter] = React.useState(0);
  return (
    <div>
      <h1>Products</h1>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(prev => prev + 1)}>counter</button>
    </div>
  );
};

export default Index;