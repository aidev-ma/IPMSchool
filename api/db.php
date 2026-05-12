<?php
/**
 * Ce fichier charge la configuration depuis un fichier externe sécurisé.
 * Le fichier `config.local.php` doit être placé au-dessus de `httpdocs/` sur Plesk.
 * Exemple de chemin : `/var/www/vhosts/votre-domaine.com/config.local.php`
 */

$configPath = dirname(__DIR__, 2) . '/config.local.php';

if (!file_exists($configPath)) {
    // Si le fichier n'existe pas dans le dossier parent, on essaye de voir s'il est au même niveau 
    // (pratique pour le développement local si on l'a mis à la racine du projet)
    $configPath = dirname(__DIR__) . '/config.local.php';
    
    if (!file_exists($configPath)) {
        header("Content-Type: application/json; charset=UTF-8");
        http_response_code(500);
        die(json_encode(["success" => false, "message" => "Erreur de configuration serveur."]));
    }
}

$config = require $configPath;

$host = $config['db_host'] ?? 'localhost';
$dbname = $config['db_name'] ?? '';
$user = $config['db_user'] ?? '';
$pass = $config['db_pass'] ?? '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log("Erreur de connexion PDO: " . $e->getMessage());
    header("Content-Type: application/json; charset=UTF-8");
    http_response_code(500);
    die(json_encode(["success" => false, "message" => "Erreur serveur."]));
}
?>