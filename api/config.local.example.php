<?php
/**
 * Modèle de configuration locale.
 * À la livraison, copiez ce fichier en `../config.local.php` (au-dessus de `httpdocs/`)
 * sur votre serveur Plesk et y mettre vos vrais identifiants.
 */
return [
    'db_host' => 'localhost',
    'db_name' => 'marianne_db', // Remplacez par le nom de la base
    'db_user' => 'marianne_user', // Remplacez par votre utilisateur
    'db_pass' => 'VOTRE_MOT_DE_PASSE', // Remplacez par le mot de passe
    
    // Ajoutez ici les domaines autorisés pour les requêtes CORS
    'allowed_origins' => [
        'https://ipmschool.ma',
        'https://www.ipmschool.ma'
    ],
];
?>