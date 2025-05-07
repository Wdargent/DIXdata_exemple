import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import IncidentCreate from './pages/IncidentCreate';
import IncidentEdit from './pages/IncidentEdit';
import IncidentList from './pages/IncidentList';
import Home from './pages/Home';

function App() {
    return (
        <div>
            <h1>Hello from React! 👋</h1>
            <IncidentForm />
        </div>
    );
}

// Rendu du composant App dans l'élément HTML avec l'ID "root"
const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<App />);

root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/incidents/new" element={<IncidentCreate />} />
          <Route path="/incidents" element={<IncidentList />} />
          <Route path="/incidents/:id/edit" element={<IncidentEdit />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
