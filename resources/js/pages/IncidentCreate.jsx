import React from 'react';
import IncidentForm from '../form/IncidentForm'; // Importer ton composant formulaire

const IncidentCreate = () => {
  return (
    <div>
      <div class="title_table">
        <h1 class="title_header">
          <span class="icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16">
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
            </svg>
          </span>
          <div>Créer un Incident</div>
          <a class="new-btn" href={`/incidents`}>
            <div>Liste des Incidents</div>
          </a>
        </h1>
      </div>
      <IncidentForm /> {/* Utiliser le composant IncidentForm ici */}
    </div>
  );
};

export default IncidentCreate;
