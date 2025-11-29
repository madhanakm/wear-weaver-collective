<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDbConnection();
    
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM clients WHERE status = 'active' ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO clients (name, logo_url, status) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $data['logo_url'], $data['status'] ?? 'active']);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        
    } elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE clients SET name = ?, logo_url = ?, status = ? WHERE id = ?");
        $stmt->execute([$data['name'], $data['logo_url'], $data['status'], $data['id']]);
        echo json_encode(['success' => true]);
        
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM clients WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
    
} catch(Exception $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>