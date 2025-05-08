import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IncidentForm from '../form/IncidentForm';

const IncidentEdit = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    fetch(`/api/incidents/${id}`)
      .then(res => res.json())
      .then(data => setIncident(data))
      .catch(console.error);
  }, [id]);

  return (
    <div>
      <div class="title_table">
        <h1 class="title_header">
          <span class="icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </span>
          <div>Modifier un Incident</div>
          <a class="new-btn" href={`/incidents/new`}>
            <div>Liste des Incidents</div>
          </a>
        </h1>
      </div>
      {incident ? <IncidentForm incident={incident} /> : <p>Chargement...</p>}
    </div>
  );
};

export default IncidentEdit;
