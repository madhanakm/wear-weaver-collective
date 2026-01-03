<?php
error_reporting(0);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

// Database configuration
require_once 'config/database.php';

try {
    $pdo = getDbConnection();
    
    $sql = "INSERT INTO quotes (name, email, phone, company, product_type, quantity, message) 
            VALUES (:name, :email, :phone, :company, :product_type, :quantity, :message)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $input['name'] ?? '',
        ':email' => $input['email'] ?? '',
        ':phone' => $input['phone'] ?? '',
        ':company' => $input['company'] ?? '',
        ':product_type' => $input['productType'] ?? '',
        ':quantity' => $input['quantity'] ?? '',
        ':message' => $input['message'] ?? ''
    ]);
    
    echo json_encode(['success' => true, 'message' => 'Quote request saved successfully!']);
    
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>