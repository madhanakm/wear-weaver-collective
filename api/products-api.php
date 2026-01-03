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
    
    if ($path === 'public' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'admin' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif ($path === 'create' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO products (name, description, image_url, status) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['name'], $data['description'], $data['image_url'], $data['status']]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        
    } elseif (strpos($path, 'update/') === 0 && $method === 'PUT') {
        $id = substr($path, 7);
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE products SET name = ?, description = ?, image_url = ?, status = ? WHERE id = ?");
        $stmt->execute([$data['name'], $data['description'], $data['image_url'], $data['status'], $id]);
        echo json_encode(['success' => true]);
        
    } elseif (strpos($path, 'delete/') === 0 && ($method === 'DELETE' || $method === 'POST')) {
        $id = substr($path, 7);
        $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        
    } elseif (strpos($path, 'add-gallery/') === 0 && $method === 'POST') {
        $productId = substr($path, 12);
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO product_gallery (product_id, title, image_url) VALUES (?, ?, ?)");
        $stmt->execute([$productId, $data['title'], $data['image_url']]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        
    } elseif (strpos($path, 'gallery/') === 0 && $method === 'GET') {
        $productId = substr($path, 8);
        $stmt = $pdo->prepare("SELECT * FROM product_gallery WHERE product_id = ? ORDER BY created_at DESC");
        $stmt->execute([$productId]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        
    } elseif (strpos($path, 'delete-gallery/') === 0 && ($method === 'DELETE' || $method === 'POST')) {
        $id = substr($path, 15);
        $stmt = $pdo->prepare("DELETE FROM product_gallery WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
    
} catch(Exception $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>