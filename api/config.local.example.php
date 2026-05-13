<?php
/**
 * Modèle de configuration locale.
 * À la livraison, copiez ce fichier en `../config.local.php` (au-dessus de `httpdocs/`)
 * sur votre serveur Plesk et y mettre vos vraies valeurs.
 */
return [
    // ----- Base de données MariaDB / MySQL -----
    'db_host' => 'localhost',
    'db_name' => 'marianne_db',          // Remplacez par le nom de la base
    'db_user' => 'marianne_user',        // Remplacez par votre utilisateur
    'db_pass' => 'VOTRE_MOT_DE_PASSE',   // Remplacez par le mot de passe

    // ----- SMTP (envoi des emails de notification) -----
    // Sur Plesk, créez d'abord une boîte dédiée (ex: noreply@votre-domaine.tld)
    // puis renseignez ses identifiants ici. Le smtp_host est celui affiché par
    // Plesk dans Mail Settings ("Outgoing mail server"), généralement le
    // domaine principal (ex: ipmschool.ma), pas le sous-domaine mail.
    'smtp_host'   => 'ipmschool.ma',
    'smtp_port'   => 465,                // 465 (SSL) ou 587 (TLS)
    'smtp_secure' => 'ssl',              // 'ssl' pour 465, 'tls' pour 587
    'smtp_user'   => 'noreply@ipmschool.ma',
    'smtp_pass'   => 'MOT_DE_PASSE_NOREPLY',

    // Expéditeur affiché dans la boîte du destinataire
    'mail_from_email' => 'noreply@ipmschool.ma',
    'mail_from_name'  => 'IPM School - Site Web',

    // Destinataires internes (école)
    'mail_to_contact'     => 'Contact@ipmschool.ma',
    'mail_to_inscription' => 'Inscription@ipmschool.ma',

    // Optionnel : couper temporairement tous les envois (true/false)
    'mail_enabled' => true,
    // Optionnel : log SMTP détaillé dans error_log pour debug (true/false)
    'mail_debug'   => false,
    // Optionnel : désactive la vérification du certificat SSL.
    // Indispensable si smtp_host = 'localhost' (le cert ne couvre pas localhost).
    // Sans risque ici car la connexion ne sort pas de la machine.
    'mail_smtp_skip_verify' => false,

    // ----- CORS -----
    // Domaines autorisés pour les requêtes JavaScript du site
    'allowed_origins' => [
        'https://ipmschool.ma',
        'https://www.ipmschool.ma',
    ],
];
