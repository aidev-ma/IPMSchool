## Objectif

Garantir la lisibilité du titre « Votre Avenir en Soins de Santé » et du paragraphe en dessous, tout en gardant l'image (personnages à droite) bien visible. Les boutons restent inchangés.

## Trois options proposées

Je recommande l'**Option A** par défaut, mais voici les trois pour que tu puisses choisir (ou combiner) :

### Option A — Panneau "verre dépoli" (glassmorphism) — recommandée
Un bloc translucide blanc derrière uniquement le titre + paragraphe, avec flou d'arrière-plan léger. Élégant, professionnel, ne couvre que la zone texte (max-w-xl à gauche), l'image reste nette à droite.
- Style : `bg-white/55 backdrop-blur-md rounded-2xl p-6 sm:p-8 ring-1 ring-white/40 shadow-soft`
- Texte titre passe en `text-primary` plein (plus lisible que dégradé sur fond clair) et garde l'accent dégradé sur "Soins de Santé".

### Option B — Dégradé latéral renforcé (sans bloc visible)
Aucun panneau visible : on ajoute un voile dégradé blanc gauche→transparent par-dessus l'image, plus marqué côté texte, qui s'évanouit avant les personnages.
- Style : overlay `bg-gradient-to-r from-background via-background/80 to-transparent` + une légère ombre portée sur le texte (`drop-shadow-sm`).
- Avantage : zéro "boîte", look très épuré. Inconvénient : moins de séparation visuelle.

### Option C — Bandeau coloré marque (panneau plein discret)
Un bloc avec la couleur primaire de la marque à très faible opacité + bord turquoise, donnant un côté éditorial/identitaire.
- Style : `bg-primary/10 border-l-4 border-accent rounded-r-xl px-6 py-6 backdrop-blur-sm`
- Texte titre en `text-primary`, paragraphe en `text-foreground`.

## Ajustements communs aux trois options

- Aligner la largeur du bloc texte sur les cartes de stats : passer `max-w-2xl` → `max-w-xl` pour un meilleur rythme visuel avec les 4 tuiles en bas.
- Réduire un peu la taille du paragraphe sur desktop (`text-lg lg:text-xl`) pour respirer.
- Augmenter le contraste : `text-foreground` (au lieu de `text-foreground/85`) sur le paragraphe.
- Conserver les deux boutons à l'identique, **hors** du panneau translucide (pour ne pas alourdir visuellement). Ils restent juste en dessous.
- Garder l'image `object-right` intacte, aucun filtre global appliqué.

## Détails techniques (Option A par défaut)

Fichier modifié : `src/components/Hero.tsx`

Changements :
1. Wrapper le `<h1>` + `<p>` dans une `div` avec classes glassmorphism listées ci-dessus.
2. `<h1>` : retirer le dégradé sur "Votre Avenir en", garder le span dégradé uniquement sur "Soins de Santé".
3. `<p>` : passer à `text-foreground` pleine opacité.
4. Réduire `max-w-2xl` → `max-w-xl`.
5. Boutons : inchangés, en dehors du panneau, avec `mt-6`.

```tsx
<div className="max-w-xl">
  <div className="bg-white/55 backdrop-blur-md rounded-2xl p-6 sm:p-8 ring-1 ring-white/40 shadow-soft">
    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-5 leading-[1.05] tracking-tight">
      Votre Avenir en{" "}
      <span className="bg-gradient-hero bg-clip-text text-transparent">Soins de Santé</span>
    </h1>
    <p className="text-lg lg:text-xl text-foreground leading-relaxed">
      Rejoignez une formation d'excellence...
    </p>
  </div>
  <div className="flex flex-col sm:flex-row gap-4 mt-6">{/* boutons inchangés */}</div>
</div>
```

## Question

Quelle option appliquer : **A (glass)**, **B (dégradé seul)**, **C (panneau marque)**, ou un mix ? Si pas de réponse, j'applique l'Option A.
