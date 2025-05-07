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
      <h2>Modifier un incident</h2>
      {incident ? <IncidentForm incident={incident} /> : <p>Chargement...</p>}
    </div>
  );
};

export default IncidentEdit;
