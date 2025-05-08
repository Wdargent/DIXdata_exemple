import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LexicalEditor from '../components/TextEditor'

const IncidentForm = ({ incident = null }) => {
  const [titre, setTitre] = useState(incident?.titre || '');
  const [description, setDescription] = useState(incident?.description || '');
  const [visible, setVisible] = useState(incident?.visible ?? true);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir description en chaîne JSON avant l'envoi
    const formattedDescription = JSON.stringify(description);

    const data = {
      titre,
      description: formattedDescription,
      visible
    };

try {
      const response = await fetch(`/api/incidents${incident?.id ? '/' + incident.id : ''}`, {
        method: incident?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la soumission.');
      }

      const result = await response.json();
      setMessage('Succès !');

      if (!incident) {
        // réinitialiser uniquement si c'est une création
        setTitre('');
        setDescription('');
        setVisible(true);
      }

      navigate('/incidents');

    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div class="form-wrapper">
      <div class="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre :</label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description :</label>
            <LexicalEditor onChangeContent={setDescription} />
          </div>

          <div className="form-group">
            <label>Visible :</label>
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
          </div>

          <button type="submit" className='validate-btn-form'>
            {incident?.id ? 'Mettre à jour' : 'Créer'}
          </button>
          
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;
