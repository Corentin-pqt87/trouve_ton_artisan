import React from "react";

function ArtisanCard({ artisan }) {
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
    <div class="card artisan-fiche">
        <div class="card-body">
            <h5 class="card-title grey">{artisan.nom}</h5>
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
            <a href={artisan.email} class="card-link">{artisan.email}</a>
            <a href={artisan.site_web} class="card-link">{artisan.site_web}</a>
            <p>{artisan.Ville.ville_name}</p>
        </div>
    </div>
  );
}
export default ArtisanCard;