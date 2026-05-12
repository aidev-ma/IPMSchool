# Plan — Durcissement sécurité backend PHP

Objectif : corriger les 6 points soulevés sur `api/db.php` et `api/register.php`, plus une petite adaptation frontend pour le honeypot. Aucune modification du design ni de la logique métier.

## 1. Externaliser les credentials DB (`api/db.php`)

- Lire la config depuis un fichier **hors webroot** : `../config.local.php` (à placer par vous au-dessus de `httpdocs/` dans Plesk).
- Ce fichier retournera un tableau :
  ```php
  <?php
  return [
    'db_host' => 'localhost',
    'db_name' => 'marianne_db',
    'db_user' => 'marianne_user',
    'db_pass' => '...',
    'allowed_origins' => ['https://ipmschool.ma', 'https://www.ipmschool.ma'],
  ];
  ```
- `db.php` charge ce tableau, expose `$pdo` et `$config`.
- Si le fichier est absent → réponse JSON 500 propre (pas de `die()` brut), sans révéler de détails.
- Activer `PDO::ATTR_EMULATE_PREPARES = false` et `PDO::ATTR_DEFAULT_FETCH_MODE = FETCH_ASSOC`.
- Fournir un `api/config.local.example.php` versionné comme modèle, et documenter le chemin attendu dans un commentaire en tête de `db.php`.

> Note : à la livraison, je laisserai des valeurs placeholder dans `config.local.example.php`. Vous copierez ce fichier en `../config.local.php` (au-dessus de `httpdocs/`) sur Plesk et y mettrez les vrais identifiants. Confirmez-moi le **vrai domaine de production** (je suppose `ipmschool.ma` + `www.ipmschool.ma`) — sinon ajustez la liste `allowed_origins` directement dans `config.local.php`.

## 2. CORS restreint (`api/register.php`)

- Lire `$config['allowed_origins']`.
- Vérifier `$_SERVER['HTTP_ORIGIN']` ; si présent dans la whitelist → renvoyer `Access-Control-Allow-Origin: <origin>` + `Vary: Origin`.
- Sinon → ne pas envoyer d'en-tête CORS (le navigateur bloquera).
- Conserver le handler OPTIONS (preflight) avec les mêmes règles.

## 3. Corriger `bindParam` + retirer `htmlspecialchars` à l'insertion

- Remplacer tous les `bindParam(':x', htmlspecialchars(...))` par `bindValue(':x', $valeur, PDO::PARAM_STR)`.
- Stocker les valeurs **brutes** (trim uniquement). L'échappement HTML se fera à l'affichage (admin).
- L'email nullable utilisera `bindValue(..., PDO::PARAM_NULL)` quand vide.

## 4. Validation stricte côté PHP (whitelists)

Au-dessus du bloc d'insertion, valider chaque champ :

- `nom` : string, trim, 2–100 chars, regex `/^[\p{L}\s'’\-]+$/u`.
- `telephone` : trim, regex `/^[+0-9\s().\-]{8,20}$/`.
- `email` : optionnel ; si fourni → `filter_var(..., FILTER_VALIDATE_EMAIL)`, max 255.
- `filiere` : whitelist `['infirmier-polyvalent','infirmier-auxiliaire','aide-soignant']` (slugs identiques au front).
- `niveau` : whitelist dépendant de la filière (mêmes valeurs que `src/pages/Inscription.tsx`) :
  - polyvalent → `1ère année|2ème année|3ème année`
  - auxiliaire → `1ère année|2ème année`
  - aide-soignant → `1ère année`
- `bac` : whitelist `['bac-obtenu','niveau-bac','sans-bac']` (à aligner avec `bacOptions` du front).
- En cas d'échec → `400` JSON `{"success":false,"message":"Données invalides","field":"<name>"}`.

## 5. Honeypot anti-spam

**Frontend (`src/pages/Inscription.tsx`)** :
- Ajouter un champ caché `website` dans le state initial (`""`), rendu dans un `<div>` en `position:absolute; left:-9999px; height:0; overflow:hidden;` avec `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`.
- L'inclure dans le payload JSON envoyé.

**Backend (`api/register.php`)** :
- Si `!empty($data->website)` → renvoyer **HTTP 201 + `{"success":true,"message":"Inscription enregistrée avec succès."}`** (faux succès silencieux choisi), **sans** insérer en base.
- Optionnel : `error_log("honeypot triggered from " . $_SERVER['REMOTE_ADDR']);`.

## 6. Robustesse / hygiène

- En cas d'exception PDO : log via `error_log()`, réponse générique `500 {"success":false,"message":"Erreur serveur."}` (ne plus exposer `$e->getMessage()`).
- Forcer `Content-Type: application/json; charset=UTF-8` sur toutes les sorties.
- Refuser tout `REQUEST_METHOD` autre que `POST`/`OPTIONS` → `405`.

## Fichiers touchés

- `api/db.php` — refactor (chargement config externe, options PDO).
- `api/register.php` — CORS dynamique, validation stricte, bindValue, honeypot, gestion d'erreurs.
- `api/config.local.example.php` — **nouveau**, modèle à copier hors webroot.
- `src/pages/Inscription.tsx` — ajout du champ honeypot caché + envoi dans le payload.

## Hors périmètre (à voir plus tard si vous le souhaitez)

- Rate-limiting (par IP, ex. table `inscription_attempts` ou fail2ban Plesk).
- Notification email admin sur nouvelle inscription.
- Table `consents` RGPD avec `consent_at`.
- Captcha (hCaptcha/Turnstile) si le honeypot ne suffit pas.
