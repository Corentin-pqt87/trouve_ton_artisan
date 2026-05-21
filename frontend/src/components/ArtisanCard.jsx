import React from "react";

function ArtisanCard({ artisan }) {
  // 1. Logique métier pour la couleur du badge de la note (selon vos objectifs)
  let noteBadgeClass = "text-bg-danger"; // Par défaut <= 3.5
  
  if (artisan.note >= 4.5) {
    noteBadgeClass = "text-bg-success"; //
  } else if (artisan.note > 3.5 && artisan.note < 4.5) {
    noteBadgeClass = "text-bg-warning"; //
  }

  return (
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{artisan.nom}</h5>
            <span class="badge text-bg-success">{artisan.note}/5</span>
            <div>
                <span class="badge rounded-pill text-bg-primary">
                    {artisan.Specialite.specialite_name}
                </span>
                <span class="badge rounded-pill text-bg-secondary">
                    {artisan.Categorie.categorie_name}
                </span>
            </div>
            <p class="card-text">{artisan.a_propos}</p>
            <a href="#" class="card-link">{artisan.email}</a>
            <a href="#" class="card-link">{artisan.site_web}</a>
            <p>{artisan.Ville.ville_name}</p>
        </div>
    </div>
  );
}
export default ArtisanCard;