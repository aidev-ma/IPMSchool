<?php
/**
 * Connexion PDO + chargement de la configuration externe.
 *
 * La configuration (credentials DB + origines CORS autorisées) est chargée
 * depuis un fichier situé HORS du webroot :
 *   ../config.local.php  (relatif au dossier api/)
 *
 * Voir api/config.local.example.php pour le modèle.
 */

function ipms_fail(int $code, string $message): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

// Recherche du fichier de config : d'abord hors webroot (../../), puis fallback ../
$configCandidates = [
    __DIR__ . '/../../config.local.php', // recommandé : au-dessus de httpdocs/
    __DIR__ . '/../config.local.php',    // fallback : à la racine du projet
];

$config = null;
foreach ($configCandidates as $candidate) {
    if (is_file($candidate)) {
        $config = require $candidate;
        break;
    }
}

if (!is_array($config)) {
    error_log('[IPMS] config.local.php introuvable.');
    ipms_fail(500, 'Erreur de configuration serveur.');
}

try {
    $pdo = new PDO(
        "mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8mb4",
        $config['db_user'],
        $config['db_pass'],
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    error_log('[IPMS] DB connection failed: ' . $e->getMessage());
    ipms_fail(500, 'Erreur de connexion à la base de données.');
}
