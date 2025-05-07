import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Bienvenue sur la page d'accueil</h1>
    <nav>
      <Link to="/incidents/new">Créer un incident</Link> |
      <Link to="/incidents">Voir les incidents</Link>
    </nav>
  </div>
);

export default Home;
