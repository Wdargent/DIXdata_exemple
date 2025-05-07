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
      <h1>Liste des Incidents</h1>
      <div class="table-wrapper">
        <table class="table-custom">
          <thead class="table-header">
            <tr>
              <th class="table-cell">Titre</th>
              <th class="table-cell">Description</th>
              <th class="table-cell">Créé le</th>
              <th class="table-cell">Modifié le</th>
              <th class="table-cell">Visible</th>
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
                    <div class="edit-btn">🖉</div>
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
