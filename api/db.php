<?php
$host = 'localhost';
$dbname = 'marianne_db'; // à modifier dans Plesk
$user = 'marianne_user'; // à modifier dans Plesk
$pass = 'VOTRE_MOT_DE_PASSE'; // à modifier dans Plesk

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    header("Content-Type: application/json; charset=UTF-8");
    die(json_encode(["success" => false, "message" => "Erreur de connexion à la base de données."]));
}
?>