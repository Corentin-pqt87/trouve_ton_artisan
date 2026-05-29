import React, { useState } from 'react';

export default function ContactForm({ artisanEmail, artisanNom, onCancel }) {
  const [nom, setNom] = useState('');
  const [sujet, setSujet] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      // Appel à votre future route Backend pour l'envoi d'email
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: artisanEmail,       // L'email de l'artisan destinataire
          fromName: nom,          // Le nom de l'utilisateur qui contacte
          subject: sujet,
          message: message
        }),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'envoi du message.");
      }

      setStatus({ loading: false, success: 'Votre message a bien été envoyé ! An artisan vous répondra sous 48h.', error: null });
      // Réinitialisation des champs du formulaire
      setNom('');
      setSujet('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <div className="contact-form-container mt-3 p-3 border rounded bg-light">
      <h6 className="mb-3 text-dark">Contacter {artisanNom}</h6>
      
      {status.success && <div className="alert alert-success py-2 fs-7">{status.success}</div>}
      {status.error && <div className="alert alert-danger py-2 fs-7">{status.error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label small mb-1">Votre Nom / Prénom</label>
          <input 
            type="text" 
            className="form-control form-control-sm" 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-2">
          <label className="form-label small mb-1">Sujet</label>
          <input 
            type="text" 
            className="form-control form-control-sm" 
            value={sujet} 
            onChange={(e) => setSujet(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-2">
          <label className="form-label small mb-1">Votre Message</label>
          <textarea 
            className="form-control form-control-sm" 
            rows="3" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required
          ></textarea>
        </div>
        <div className="d-flex gap-2 justify-content-end mt-3">
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onCancel}>
            Annuler
          </button>
          <button type="submit" className="btn btn-sm btn-primary" disabled={status.loading}>
            {status.loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      </form>
    </div>
  );
}