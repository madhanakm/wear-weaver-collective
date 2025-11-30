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
            if ($path === 'posts') {
                $stmt = $pdo->query("SELECT id, title, slug, excerpt, featured_image, created_at FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC");
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            } elseif (preg_match('/^post\/(.+)$/', $path, $matches)) {
                $slug = $matches[1];
                $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'");
                $stmt->execute([$slug]);
                $post = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($post ?: ['error' => 'Post not found']);
            } elseif (preg_match('/^admin\/post\/(.+)$/', $path, $matches)) {
                $id = $matches[1];
                $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
            }
            break;
            
        case 'POST':
            if ($path === 'create') {
                $input = json_decode(file_get_contents('php://input'), true);
                $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', trim($input['title'])));
                
                $stmt = $pdo->prepare("INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, status) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $input['title'],
                    $slug,
                    $input['content'],
                    substr(strip_tags($input['content']), 0, 200) . '...',
                    $input['featured_image'] ?? '',
                    $input['status'] ?? 'draft'
                ]);
                
                echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            } elseif (preg_match('/^update\/(.+)$/', $path, $matches)) {
                $id = $matches[1];
                $input = json_decode(file_get_contents('php://input'), true);
                $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', trim($input['title'])));
                
                $stmt = $pdo->prepare("UPDATE blog_posts SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, status = ? WHERE id = ?");
                $stmt->execute([
                    $input['title'],
                    $slug,
                    $input['content'],
                    substr(strip_tags($input['content']), 0, 200) . '...',
                    $input['featured_image'] ?? '',
                    $input['status'] ?? 'draft',
                    $id
                ]);
                
                echo json_encode(['success' => true]);
            }
            break;
            
        case 'PUT':
            if (preg_match('/^update\/(.+)$/', $path, $matches)) {
                $id = $matches[1];
                $input = json_decode(file_get_contents('php://input'), true);
                $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', trim($input['title'])));
                
                $stmt = $pdo->prepare("UPDATE blog_posts SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, status = ? WHERE id = ?");
                $stmt->execute([
                    $input['title'],
                    $slug,
                    $input['content'],
                    substr(strip_tags($input['content']), 0, 200) . '...',
                    $input['featured_image'] ?? '',
                    $input['status'] ?? 'draft',
                    $id
                ]);
                
                echo json_encode(['success' => true]);
            }
            break;
            
        case 'DELETE':
        case 'POST':
            if (preg_match('/^delete\/(.+)$/', $path, $matches)) {
                $id = $matches[1];
                $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['success' => true]);
            }
            break;
    }
    
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>