<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

require_once 'config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$path = $_GET['path'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDbConnection();
    
    if ($path === 'admin' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM sliders ORDER BY sort_order ASC, created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'public' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM sliders WHERE status = 'active' ORDER BY sort_order ASC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'create' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO sliders (title, description, image_url, button_text, button_link, button_text_2, button_link_2, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'], 
            $data['description'], 
            $data['image_url'], 
            $data['button_text'], 
            $data['button_link'], 
            $data['button_text_2'], 
            $data['button_link_2'], 
            $data['sort_order'] ?? 0, 
            $data['status'] ?? 'active'
        ]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        
    } elseif (strpos($path, 'update/') === 0 && $method === 'PUT') {
        $id = substr($path, 7);
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE sliders SET title = ?, description = ?, image_url = ?, button_text = ?, button_link = ?, button_text_2 = ?, button_link_2 = ?, sort_order = ?, status = ? WHERE id = ?");
        $stmt->execute([
            $data['title'], 
            $data['description'], 
            $data['image_url'], 
            $data['button_text'], 
            $data['button_link'], 
            $data['button_text_2'], 
            $data['button_link_2'], 
            $data['sort_order'], 
            $data['status'], 
            $id
        ]);
        echo json_encode(['success' => true]);
        
    } elseif (strpos($path, 'delete/') === 0 && $method === 'DELETE') {
        $id = substr($path, 7);
        $stmt = $pdo->prepare("DELETE FROM sliders WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        
    } else {
        echo json_encode(['error' => 'Invalid endpoint']);
    }
    
} catch(Exception $e) {
    echo json_encode(['error' => 'Database connection failed']);
}
?>