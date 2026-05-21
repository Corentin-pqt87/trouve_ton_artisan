
# Objectif

Le si se connecte à la bese de donnée via l'hébergeur [aiven.io](https://aiven.io/). L'API récupère les tables de données.

## Pages d'accueil
Cette pages contien :
1. Les explication sur le fonctionnement du site dans la rebrique : "Comment trouver mon artisan ?"
   1. Choisir la catégorie d’artisanat dans le menu. 
   2. Choisir un artisan.
   3. Le contacter via le formulaire de contact.
   4. Une réponse sera apportée sous 48h.
2. les artisans du mois *(les artisans avec artisan.top_artisan == 1)*
   1. fiche identique à la fichie de class card qui sera décrit dans le chapitre [Le contenue](./objectif.md#le-contenue) dans [Page de recherche](./objectif.md#page-de-recherche).
## Page de recherche

### Le contenue

Le contenue de la page d'accueil (`<main>`) est diviser en 2, une `<div>` gauche `class="recherche"` (1/4) et une `<div>` droite `class="resultat"` (3/4).\
Les résultats de recherche sont dans la base de donnée sur la table `artisan`. Les résultats sont afficher sous forme de carte via la class "card" de [bootstrap](https://getbootstrap.com/docs/5.3/components/card/#titles-text-and-links).

```jsx
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{artisan.nom}</h5>
    <span class="badge text-bg-success">{artisan.note}/5</span>
    <div>
      <span class="badge rounded-pill text-bg-primary">
        {artisan.id_specialite.nom}
      </span>
      <span class="badge rounded-pill text-bg-secondary">
        {artisan.id_caregorie.nom}
      </span>
    </div>
    <p class="card-text">{artisan.a_propos}</p>
    <a href="#" class="card-link">{artisan.email}</a>
    <a href="#" class="card-link">{artisan.site_web}</a>
    <p>{artisan.id_ville.nom}</p>
  </div>
</div>
```

#### Partie gauche : recherche
Les cherches ce font via des cases à cocher qui ajoute des parametre de recherche pour l'API


#### Partie droite : résultat

Paramètre sur les champs :
- `<h5 class="card-title">` : artisan.nom
- `<span class="badge rounded-pill text-bg-primary">` : artisan.id_specialite $\to$ id_specialite.nom
- `<span class="badge rounded-pill text-bg-secondary">` : artisan.id_caregorie $\to$ id_caregorie.nom
- `<p class="card-text">` : artisan.a_propos
- `<a href="#" class="card-link">` :
  1. artisan.email
  2. artisan.site_web *(si le champ n'est pas vide)*
- `<span class="badge ` : artisan.note
   - `text-bg-success">` : artisan.note >= 4.5 
   - `text-bg-warning">` : 3.5 < artisan.note < 4.5
   - `text-bg-danger">` : artisan.note <= 3.5


## Elements identique a toute les pages

### Le header

Le frontend affiche une page d'acceuil avec un header

|élément |action|
|:----- |:----|
|image logo|Enlève tout les paramètre de recherche de la table `artisan`|
|Bâtiment|Affiche les résultats de la table `artisan` avec comme champ de colonne `id_categorie` l'id de `batiment` (2).|
|Services|Affiche les résultats de la table `artisan` avec comme champ de colonne `id_categori` l'id de `service` (4).|
|Fabrication|Affiche les résultats de la table `artisan` avec comme champ de colonne `id_categori` l'id de `fabrication` (3).|
|Alimentation|Affiche les résultats de la table `artisan` avec comme champ de colonne `id_categori` l'id de `alimentation` (1).|
|bar de recherche|affiche les artisans qui ont dans leurs noms le mot rechercher|

### Le footer
Le footer ne sert qu'a afficher les mensions légals et a changer les options de cookie.
- Lyon 101 cours Charlemagne 
- CS 20033 
- 69269 LYON CEDEX 02 
- France
- +33 (0)4 26 73 40 00
*(toutes ces informations sont fictive)*

## En cas d'échec
Une pages `404` avec 