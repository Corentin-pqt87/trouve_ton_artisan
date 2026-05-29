import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

function ArtisanCard({ artisan }) {
    const [showForm, setShowForm] = useState(false);
  // note <= 3.5 : rouge
  // 3.5 < note <= 4.5 : jaune
  // 3.5 < note : vert
    let noteBadgeClass = "text-bg-danger"; // Par défaut <= 3.5
  
    if (artisan.note >= 4.5) {
    noteBadgeClass = "text-bg-success";
    } else if (artisan.note > 3.5 && artisan.note < 4.5) {
        noteBadgeClass = "text-bg-warning";
    }

    return (
        <div className="card artisan-fiche">
            <div className="card-body">
                <h5 class="card-title grey">{artisan.nom}</h5>
                <p className="artisan-ville">{artisan.Ville.ville_name}</p>
                <span className="badge text-bg-success">{artisan.note}/5</span>
                <div>
                    <span className="badge rounded-pill text-bg-primary">
                        {artisan.Specialite.specialite_name}
                    </span>
                    <span className="badge rounded-pill text-bg-secondary">
                        {artisan.Categorie.categorie_name}
                    </span>
                </div>
                <p className="card-text">{artisan.a_propos}</p>
                {artisan.email && artisan.email.trim() !== "" && (
                    <a className="card-link" href={`mailto:${artisan.email}`}>Email</a>
                )}
                {showForm && (
                <ContactForm 
                    artisanEmail={artisan.email} 
                    artisanNom={artisan.nom} 
                    onCancel={() => setShowForm(false)} 
                />
                )}
            
            </div>
        </div>
  );
}
export default ArtisanCard;