<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config/database.php';

try {
    $pdo = getDbConnection();
    
    $method = $_SERVER['REQUEST_METHOD'];
    $path = $_GET['path'] ?? '';
    
    switch ($method) {
        case 'GET':
            if ($path === 'all') {
                $stmt = $pdo->query("SELECT * FROM testimonials WHERE status = 'active' ORDER BY created_at DESC");
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            } elseif ($path === 'admin') {
                $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY created_at DESC");
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            }
            break;
            
        case 'POST':
            if ($path === 'create') {
                $input = json_decode(file_get_contents('php://input'), true);
                
                // Debug logging
                error_log('Testimonial input: ' . print_r($input, true));
                
                if (!$input || !isset($input['name']) || !isset($input['message'])) {
                    echo json_encode(['error' => 'Missing required fields', 'input' => $input]);
                    break;
                }
                
                $stmt = $pdo->prepare("INSERT INTO testimonials (name, company, message, rating, status) VALUES (?, ?, ?, ?, ?)");
                $result = $stmt->execute([
                    $input['name'],
                    $input['company'] ?? '',
                    $input['message'],
                    intval($input['rating'] ?? 5),
                    $input['status'] ?? 'active'
                ]);
                
                if ($result) {
                    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
                } else {
                    echo json_encode(['error' => 'Failed to insert testimonial']);
                }
            }
            break;
            
        case 'PUT':
            if (preg_match('/^update\/(.+)$/', $path, $matches)) {
                $id = $matches[1];
                $input = json_decode(file_get_contents('php://input'), true);
                
                $stmt = $pdo->prepare("UPDATE testimonials SET name = ?, company = ?, message = ?, rating = ?, status = ? WHERE id = ?");
                $stmt->execute([
                    $input['name'],
                    $input['company'] ?? '',
                    $input['message'],
                    $input['rating'] ?? 5,
                    $input['status'] ?? 'active',
                    $id
                ]);
                
                echo json_encode(['success' => true]);
            }
            break;
            
        case 'DELETE':
            if (preg_match('/^delete\/(.+)$/', $path, $matches)) {
                $id = $matches[1];
                $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
                $result = $stmt->execute([$id]);
                
                if ($result && $stmt->rowCount() > 0) {
                    echo json_encode(['success' => true, 'message' => 'Testimonial deleted']);
                } else {
                    echo json_encode(['error' => 'Testimonial not found or already deleted']);
                }
            } else {
                echo json_encode(['error' => 'Invalid delete path']);
            }
            break;
    }
    
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>