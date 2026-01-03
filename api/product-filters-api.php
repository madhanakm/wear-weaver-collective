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
    
    if ($path === 'admin' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM gallery_filters ORDER BY name");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'public' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM gallery_filters WHERE status = 'active' ORDER BY name");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'create' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO gallery_filters (name, status) VALUES (?, ?)");
        $stmt->execute([$data['name'], $data['status']]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        
    } elseif (strpos($path, 'update/') === 0 && ($method === 'PUT' || $method === 'POST')) {
        $id = substr($path, 7);
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE gallery_filters SET name = ?, status = ? WHERE id = ?");
        $stmt->execute([$data['name'], $data['status'], $id]);
        echo json_encode(['success' => true]);
        
    } elseif (strpos($path, 'delete/') === 0 && ($method === 'DELETE' || $method === 'POST')) {
        $id = substr($path, 7);
        $stmt = $pdo->prepare("DELETE FROM gallery_filters WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        
    } else {
        echo json_encode(['error' => 'Invalid endpoint']);
    }
    
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>