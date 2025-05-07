import React from 'react';
import IncidentForm from '../form/IncidentForm'; // Importer ton composant formulaire

const IncidentCreate = () => {
  return (
    <div>
      <h1>Créer un nouvel incident</h1>
      <IncidentForm /> {/* Utiliser le composant IncidentForm ici */}
    </div>
  );
};

export default IncidentCreate;
