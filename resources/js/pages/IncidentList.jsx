import React, { useEffect, useState } from 'react';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/incidents')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des incidents');
        }
        return response.json();
      })
      .then(data => {
        setIncidents(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur fetch :', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <div class="title_table">
        <h1 class="title_header">
          <span class="icon">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16">
              <path d="M1 2.5A.5.5 0 011.5 2h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5zM1 5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5zM1 7.5A.5.5 0 011.5 7h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5zM1 10a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5zM1 12.5A.5.5 0 011.5 12h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5z"/>
            </svg>
          </span>
          <div>Liste des Incidents</div>
          <a class="new-btn" href={`/incidents/new`}>
            <div>+ Créer un Incident</div>
          </a>
        </h1>
      </div>
      <div class="table-wrapper">
        <table class="table-custom">
          <thead class="table-header">
            <tr>
              <th class="table-cell">
                <div class="header-with-icon">
                  <span class="icon_table">
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16">
                    <path d="M4 1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5.5L9.5 1H4zm5 1.5L12.5 6H9a1 1 0 01-1-1V2.5zM5 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm.5 2a.5.5 0 000 1h5a.5.5 0 000-1h-5z"/>
                  </svg>
                  </span>
                  <div>Titre</div>
                </div>
              </th>
              <th class="table-cell">Description</th>
              <th class="table-cell">
                <div class="header-with-icon">
                  <span class="icon_table">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16">
                      <path d="M3 0a.5.5 0 010 1h-.5A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0013.5 1H13a.5.5 0 010-1 .5.5 0 010 1h-10a.5.5 0 010-1zM2 4v9.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V4H2z"/>
                    </svg>
                  </span>
                  <div>Crée le</div>
                </div>
              </th>
              <th class="table-cell">
                <div class="header-with-icon">
                  <span class="icon_table">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16">
                      <path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zM4 5a2 2 0 00-2 2v9a2 2 0 002 2h5.586a2 2 0 001.414-.586l4.414-4.414A2 2 0 0016 12.414V7a2 2 0 00-2-2H4zm8.5 6.5l1 1-3.086 3.086a.5.5 0 01-.168.11l-1.414.5.5-1.414a.5.5 0 01.11-.168L12.5 11.5z"/>
                    </svg>
                  </span>
                  <div>Modifié le</div>
                </div>
              </th>
              <th class="table-cell">
                <div class="header-with-icon">
                  <span class="icon_table">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-1.5A2.5 2.5 0 1 0 8 5a2.5 2.5 0 0 0 0 5z"/>
                    </svg>
                  </span>
                  <div>Visible</div>
                </div>
              </th>
              <th class="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody class="table-body">
            {incidents.map((incident) => (
              <tr class="table-row" key={incident.id}>
                <td class="table-cell">{incident.titre}</td>
                <td class="table-cell">{incident.description}</td>
                <td class="table-cell">{new Date(incident.created_at).toLocaleString()}</td>
                <td class="table-cell">{new Date(incident.updated_at).toLocaleString()}</td>
                <td class="table-cell">{incident.visible ? 'Oui' : 'Non'}</td>
                <td class="table-cell">
                  <a href={`/incidents/${incident.id}/edit`}>
                    <div class="edit-btn icon-btn">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </div>
                  </a>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default IncidentList;
