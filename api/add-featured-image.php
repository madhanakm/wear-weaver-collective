<?php
$host = 'localhost';
$dbname = 'quote_system';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo->exec("ALTER TABLE blog_posts ADD COLUMN featured_image VARCHAR(255) DEFAULT NULL");
    
    echo json_encode(['success' => true, 'message' => 'Featured image column added successfully!']);
    
} catch(PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate column name') !== false) {
        echo json_encode(['success' => true, 'message' => 'Column already exists']);
    } else {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>