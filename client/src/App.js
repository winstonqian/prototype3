import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [employeeId] = useState('emp001'); // In production, this would come from authentication

  return (
    <div className="App">
      <Dashboard employeeId={employeeId} />
    </div>
  );
}

export default App;
