<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=UTF-8');

// ---------- CORS dynamique (whitelist) ----------
$allowedOrigins = $config['allowed_origins'] ?? [];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
}

// ---------- Preflight ----------
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
    exit;
}

// ---------- Lecture payload ----------
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Requête invalide.']);
    exit;
}

// ---------- Honeypot anti-spam (faux succès silencieux) ----------
if (!empty($data['website'])) {
    error_log('[IPMS] Honeypot triggered from ' . ($_SERVER['REMOTE_ADDR'] ?? '?'));
    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Inscription enregistrée avec succès.']);
    exit;
}

// ---------- Helpers ----------
function reject(string $message, ?string $field = null): void {
    http_response_code(400);
    $payload = ['success' => false, 'message' => $message];
    if ($field) $payload['field'] = $field;
    echo json_encode($payload);
    exit;
}

// ---------- Whitelists (alignées sur src/pages/Inscription.tsx) ----------
$allowedFilieres = ['infirmier-polyvalent', 'infirmier-auxiliaire', 'aide-soignant'];
$niveauxParFiliere = [
    'infirmier-polyvalent' => ['1ère année', '2ème année', '3ème année'],
    'infirmier-auxiliaire' => ['1ère année', '2ème année'],
    'aide-soignant'        => ['1ère année'],
];
$allowedBacs = ['sciences', 'lettres', 'sciences-eco', 'niveau-bac', '3eme-college'];

// ---------- Validation des champs ----------
$nom = isset($data['nom']) ? trim((string)$data['nom']) : '';
if ($nom === '' || mb_strlen($nom) < 2 || mb_strlen($nom) > 100
    || !preg_match("/^[\p{L}\s'’\-]+$/u", $nom)) {
    reject('Nom invalide.', 'nom');
}

$telephone = isset($data['telephone']) ? trim((string)$data['telephone']) : '';
if (!preg_match('/^[+0-9\s().\-]{8,20}$/', $telephone)) {
    reject('Téléphone invalide.', 'telephone');
}

$email = null;
if (!empty($data['email'])) {
    $emailRaw = trim((string)$data['email']);
    if (mb_strlen($emailRaw) > 255 || !filter_var($emailRaw, FILTER_VALIDATE_EMAIL)) {
        reject('Email invalide.', 'email');
    }
    $email = $emailRaw;
}

$filiere = isset($data['filiere']) ? (string)$data['filiere'] : '';
if (!in_array($filiere, $allowedFilieres, true)) {
    reject('Filière invalide.', 'filiere');
}

$niveau = isset($data['niveau']) ? (string)$data['niveau'] : '';
if (!in_array($niveau, $niveauxParFiliere[$filiere], true)) {
    reject('Niveau invalide pour cette filière.', 'niveau');
}

$bac = isset($data['bac']) ? (string)$data['bac'] : '';
if (!in_array($bac, $allowedBacs, true)) {
    reject('Type de baccalauréat invalide.', 'bac');
}

// ---------- Insertion ----------
try {
    $stmt = $pdo->prepare(
        'INSERT INTO inscriptions (nom, telephone, email, filiere, niveau, bac)
         VALUES (:nom, :telephone, :email, :filiere, :niveau, :bac)'
    );

    $stmt->bindValue(':nom',       $nom,       PDO::PARAM_STR);
    $stmt->bindValue(':telephone', $telephone, PDO::PARAM_STR);
    if ($email === null) {
        $stmt->bindValue(':email', null, PDO::PARAM_NULL);
    } else {
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    }
    $stmt->bindValue(':filiere',   $filiere,   PDO::PARAM_STR);
    $stmt->bindValue(':niveau',    $niveau,    PDO::PARAM_STR);
    $stmt->bindValue(':bac',       $bac,       PDO::PARAM_STR);

    $stmt->execute();

    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Inscription enregistrée avec succès.']);
} catch (Throwable $e) {
    error_log('[IPMS] Insert failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur serveur.']);
}
