<?php
require_once 'db.php';

header("Content-Type: application/json; charset=UTF-8");

// CORS Restreint (whitelist depuis config.local.php)
$allowed_origins = $config['allowed_origins'] ?? [];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Vary: Origin");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides ou vides."]);
    exit();
}

// Honeypot anti-spam : faux succès silencieux
if (!empty($data->website)) {
    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Message envoyé avec succès."]);
    exit();
}

// Validation stricte
$nom = isset($data->nom) ? trim($data->nom) : '';
$email = isset($data->email) ? trim($data->email) : '';
$programme = isset($data->programme) ? trim($data->programme) : '';
$message = isset($data->message) ? trim($data->message) : '';

if (mb_strlen($nom, 'UTF-8') < 2 || mb_strlen($nom, 'UTF-8') > 100 || !preg_match('/^[\p{L}\s\'’\-]+$/u', $nom)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "nom"]);
    exit();
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "email"]);
    exit();
}

$allowed_programmes = ['infirmier-polyvalent', 'infirmier-auxiliaire', 'aide-soignant', 'autre'];
if ($programme !== '' && !in_array($programme, $allowed_programmes, true)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "programme"]);
    exit();
}

$messageLen = mb_strlen($message, 'UTF-8');
if ($messageLen < 10 || $messageLen > 2000) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "message"]);
    exit();
}

try {
    $query = "INSERT INTO messages (nom, email, programme, message) VALUES (:nom, :email, :programme, :message)";
    $stmt = $pdo->prepare($query);

    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);

    if ($programme !== '') {
        $stmt->bindValue(':programme', $programme, PDO::PARAM_STR);
    } else {
        $stmt->bindValue(':programme', null, PDO::PARAM_NULL);
    }

    $stmt->bindValue(':message', $message, PDO::PARAM_STR);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Message envoyé avec succès."]);
    } else {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Impossible d'enregistrer votre message."]);
    }
} catch (Exception $e) {
    error_log("Erreur lors de l'insertion (contact) : " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur serveur."]);
}
?>