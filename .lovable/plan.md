## Problème

Sur mobile/tablette (Android, ≤768px), l'image hero (1376×768, personnages côté droit) est `object-cover object-right` et le panneau verre dépoli est superposé en haut au-dessus des visages → conflit de lisibilité ET les visages peuvent être masqués / cadrés trop serré.

## Solution recommandée — Layout empilé sur mobile

Au lieu de superposer texte et image sur petit écran, on **sépare verticalement** : image en haut (visages entiers visibles), texte + boutons en dessous sur fond clair. Sur desktop (≥lg) on garde le layout actuel superposé qui fonctionne bien.

```text
MOBILE / TABLETTE (<lg)         DESKTOP (≥lg)
┌──────────────────────┐        ┌──────────────────────────┐
│   IMAGE (visages)    │        │ [Panneau] │   IMAGE      │
│   ratio 4:3, top     │        │  texte    │  (visages    │
├──────────────────────┤        │  boutons  │   à droite)  │
│  Titre               │        └──────────────────────────┘
│  Paragraphe court    │
│  [Boutons]           │
└──────────────────────┘
            ↓
       [4 stats]
```

### Détails

**Mobile / tablette (<lg) :**
- Image en bloc séparé en haut : `aspect-[4/3] sm:aspect-[16/10]`, `object-cover object-top` pour préserver les visages (jamais coupés en haut, recadrage par le bas si nécessaire).
- Texte sur fond `bg-background` plein dessous → contraste maximal, plus besoin de glassmorphism.
- Paragraphe **raccourci sur mobile** via une version courte conditionnelle (gardé entier sur desktop).
- Boutons en pleine largeur (`w-full sm:w-auto`).

**Desktop (≥lg) :**
- On conserve le rendu actuel : image en background, panneau verre dépoli à gauche, paragraphe complet.

### Paragraphe : version courte mobile

- Mobile : « Formation d'excellence pour devenir infirmier(ère). »
- Desktop : version actuelle complète.

(Alternative si tu préfères : supprimer totalement le paragraphe sur mobile — je peux le faire à la place. Par défaut je garde la version courte, plus impactante qu'aucun texte.)

## Détails techniques

Fichier modifié : `src/components/Hero.tsx`

1. Wrapper le bloc HERO actuel dans `hidden lg:block` (rendu desktop superposé inchangé).
2. Ajouter un nouveau bloc `lg:hidden` empilé :
   - `<div>` image : `relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden` + `<img className="w-full h-full object-cover object-top">`.
   - `<div>` contenu : `px-4 sm:px-6 py-8` avec h1 (`text-3xl sm:text-4xl`), p court, boutons (`w-full sm:w-auto`).
3. Stats inchangées (déjà responsive `grid-cols-2 lg:grid-cols-4`), juste ajuster le `-mt-12` qui ne s'applique qu'en desktop : `lg:-mt-12 mt-0`.

```tsx
{/* Mobile / Tablette */}
<div className="lg:hidden">
  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
    <img src={heroImage} alt="..." className="w-full h-full object-cover object-top" />
  </div>
  <div className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
    <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight">
      Votre Avenir en{" "}
      <span className="bg-gradient-hero bg-clip-text text-transparent">Soins de Santé</span>
    </h1>
    <p className="text-base sm:text-lg text-foreground mb-6 leading-relaxed">
      Formation d'excellence pour devenir l'infirmier(ère) que vous aspirez à être.
    </p>
    <div className="flex flex-col sm:flex-row gap-3">
      <Button ... className="w-full sm:w-auto ...">Découvrir nos Programmes</Button>
      <Button ... className="w-full sm:w-auto ...">S'inscrire</Button>
    </div>
  </div>
</div>

{/* Desktop — layout actuel inchangé */}
<div className="hidden lg:block relative overflow-hidden">
  ...
</div>
```

## Question rapide

Sur mobile, tu préfères :
- **(défaut) Paragraphe court** : 1 phrase impactante.
- **Pas de paragraphe** : juste titre + boutons, encore plus aéré.

Si pas de réponse, j'applique le paragraphe court.
