<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config/database.php';

$path = $_GET['path'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDbConnection();
    
    if ($path === 'all' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM testimonials WHERE status = 'active' ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'admin' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'create' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO testimonials (name, company, message, rating, status) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['name'], $data['company'], $data['message'], $data['rating'], $data['status']]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        
    } elseif (strpos($path, 'update/') === 0 && ($method === 'PUT' || $method === 'POST')) {
        $id = substr($path, 7);
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE testimonials SET name = ?, company = ?, message = ?, rating = ?, status = ? WHERE id = ?");
        $stmt->execute([$data['name'], $data['company'], $data['message'], $data['rating'], $data['status'], $id]);
        echo json_encode(['success' => true]);
        
    } elseif (strpos($path, 'delete/') === 0 && ($method === 'DELETE' || $method === 'POST')) {
        $id = substr($path, 7);
        $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
    
} catch(Exception $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>