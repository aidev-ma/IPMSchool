<?php
require_once 'db.php';
require_once 'mailer.php';

header("Content-Type: application/json; charset=UTF-8");

// CORS Restreint
$allowed_origins = $config['allowed_origins'] ?? [];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Vary: Origin");
}

// Handle preflight requests
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

// 5. Honeypot anti-spam
if (!empty($data->website)) {
    // Faux succès silencieux
    // error_log("honeypot triggered from " . $_SERVER['REMOTE_ADDR']);
    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Inscription enregistrée avec succès."]);
    exit();
}

// 4. Validation stricte
$nom = isset($data->nom) ? trim($data->nom) : '';
$telephone = isset($data->telephone) ? trim($data->telephone) : '';
$email = isset($data->email) ? trim($data->email) : '';
$filiere = isset($data->filiere) ? trim($data->filiere) : '';
$niveau = isset($data->niveau) ? trim($data->niveau) : '';
$bac = isset($data->bac) ? trim($data->bac) : '';

// Validation nom
if (mb_strlen($nom, 'UTF-8') < 2 || mb_strlen($nom, 'UTF-8') > 100 || !preg_match('/^[\p{L}\s\'’\-]+$/u', $nom)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "nom"]);
    exit();
}

// Validation téléphone
if (!preg_match('/^[+0-9\s().\-]{8,20}$/', $telephone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "telephone"]);
    exit();
}

// Validation email (si fourni)
if ($email !== '' && (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "email"]);
    exit();
}

// Validation filière
$allowed_filieres = ['infirmier-polyvalent', 'infirmier-auxiliaire', 'aide-soignant'];
if (!in_array($filiere, $allowed_filieres, true)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "filiere"]);
    exit();
}

// Validation niveau
$niveaux_polyvalent = ['1ère année', '2ème année', '3ème année'];
$niveaux_auxiliaire = ['1ère année', '2ème année'];
$niveaux_aide_soignant = ['1ère année'];

$niveau_valid = false;
if ($filiere === 'infirmier-polyvalent' && in_array($niveau, $niveaux_polyvalent, true)) $niveau_valid = true;
if ($filiere === 'infirmier-auxiliaire' && in_array($niveau, $niveaux_auxiliaire, true)) $niveau_valid = true;
if ($filiere === 'aide-soignant' && in_array($niveau, $niveaux_aide_soignant, true)) $niveau_valid = true;

if (!$niveau_valid) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "niveau"]);
    exit();
}

// Validation bac
// Alignement avec les bacOptions du frontend
$allowed_bac = ['sciences', 'lettres', 'sciences-eco', 'niveau-bac', '3eme-college'];
if (!in_array($bac, $allowed_bac, true)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides", "field" => "bac"]);
    exit();
}

// 3. Insertion avec bindValue
try {
    $query = "INSERT INTO inscriptions (nom, telephone, email, filiere, niveau, bac) VALUES (:nom, :telephone, :email, :filiere, :niveau, :bac)";
    $stmt = $pdo->prepare($query);
    
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':telephone', $telephone, PDO::PARAM_STR);
    
    if ($email !== '') {
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    } else {
        $stmt->bindValue(':email', null, PDO::PARAM_NULL);
    }
    
    $stmt->bindValue(':filiere', $filiere, PDO::PARAM_STR);
    $stmt->bindValue(':niveau', $niveau, PDO::PARAM_STR);
    $stmt->bindValue(':bac', $bac, PDO::PARAM_STR);

    if ($stmt->execute()) {
        // Notification email à l'école — non bloquant : un échec d'envoi
        // est loggé mais ne change pas la réponse au visiteur.
        $to = $config['mail_to_inscription'] ?? '';
        if ($to !== '') {
            $emailDisplay = $email !== '' ? $email : '(non fourni)';
            $subject = "Nouvelle inscription : $nom ($filiere)";

            $rows = [
                'Nom'        => $nom,
                'Téléphone'  => $telephone,
                'Email'      => $emailDisplay,
                'Filière'    => $filiere,
                'Niveau'     => $niveau,
                'Bac'        => $bac,
                'Date'       => date('d/m/Y H:i'),
            ];

            $htmlRows = '';
            $textLines = [];
            foreach ($rows as $label => $value) {
                $htmlRows .= '<tr><td style="padding:6px 12px;background:#f4f6f8;font-weight:600;">'
                    . mailerEscape($label) . '</td><td style="padding:6px 12px;">'
                    . mailerEscape($value) . '</td></tr>';
                $textLines[] = "$label : $value";
            }

            $htmlBody = '<!doctype html><html><body style="font-family:Arial,sans-serif;color:#222;">'
                . '<h2 style="color:#0a4d8c;">Nouvelle demande d\'inscription</h2>'
                . '<p>Une nouvelle inscription vient d\'être enregistrée depuis le site :</p>'
                . '<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #ddd;">'
                . $htmlRows
                . '</table>'
                . '<p style="margin-top:20px;color:#666;font-size:12px;">'
                . 'Email automatique — répondez à cet email pour contacter directement le prospect.'
                . '</p></body></html>';

            $textBody = "Nouvelle demande d'inscription\n\n" . implode("\n", $textLines)
                . "\n\n-- Email automatique envoyé depuis ipmschool.ma";

            sendNotificationEmail(
                $config,
                $to,
                $subject,
                $htmlBody,
                $textBody,
                $email !== '' ? $email : null,
                $nom
            );
        }

        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Inscription enregistrée avec succès."]);
    } else {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Impossible d'enregistrer l'inscription."]);
    }
} catch (Exception $e) {
    error_log("Erreur lors de l'insertion : " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur serveur."]);
}
?>