<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->nom) &&
    !empty($data->telephone) &&
    !empty($data->filiere) &&
    !empty($data->niveau) &&
    !empty($data->bac)
) {
    try {
        $query = "INSERT INTO inscriptions (nom, telephone, email, filiere, niveau, bac) VALUES (:nom, :telephone, :email, :filiere, :niveau, :bac)";
        $stmt = $pdo->prepare($query);
        
        $stmt->bindParam(':nom', htmlspecialchars(strip_tags($data->nom)));
        $stmt->bindParam(':telephone', htmlspecialchars(strip_tags($data->telephone)));
        
        $email = (isset($data->email) && $data->email !== '') ? htmlspecialchars(strip_tags($data->email)) : null;
        $stmt->bindParam(':email', $email);
        
        $stmt->bindParam(':filiere', htmlspecialchars(strip_tags($data->filiere)));
        $stmt->bindParam(':niveau', htmlspecialchars(strip_tags($data->niveau)));
        $stmt->bindParam(':bac', htmlspecialchars(strip_tags($data->bac)));

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Inscription enregistrée avec succès."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Impossible d'enregistrer l'inscription."]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erreur serveur : " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données incomplètes."]);
}
?>