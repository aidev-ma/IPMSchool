<?php
/**
 * Modèle de configuration locale.
 *
 * À DÉPLOYER : copier ce fichier en `config.local.php` UN NIVEAU AU-DESSUS du
 * dossier webroot (httpdocs/) sur Plesk, par exemple :
 *
 *   /var/www/vhosts/votre-site/config.local.php   <-- ici (hors webroot)
 *   /var/www/vhosts/votre-site/httpdocs/api/...
 *
 * Ce fichier ne doit JAMAIS être servi publiquement.
 */

return [
    'db_host' => 'localhost',
    'db_name' => 'marianne_db',
    'db_user' => 'marianne_user',
    'db_pass' => 'CHANGE_ME',

    // Domaines autorisés à appeler l'API (CORS).
    // Ajoutez/retirez selon vos besoins.
    'allowed_origins' => [
        'https://ipmschool.ma',
        'https://www.ipmschool.ma',
    ],
];
