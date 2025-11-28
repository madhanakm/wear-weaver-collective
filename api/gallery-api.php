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
        $stmt = $pdo->query("SELECT * FROM gallery ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'public' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM gallery WHERE status = 'active' ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'create' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO gallery (title, image_url, category, status) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['image_url'], $data['category'], $data['status']]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        
    } elseif (strpos($path, 'update/') === 0 && $method === 'PUT') {
        $id = substr($path, 7);
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE gallery SET title = ?, image_url = ?, category = ?, status = ? WHERE id = ?");
        $stmt->execute([$data['title'], $data['image_url'], $data['category'], $data['status'], $id]);
        echo json_encode(['success' => true]);
        
    } elseif (strpos($path, 'delete/') === 0 && $method === 'DELETE') {
        $id = substr($path, 7);
        $stmt = $pdo->prepare("DELETE FROM gallery WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        
    } else {
        echo json_encode(['error' => 'Invalid endpoint']);
    }
    
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>