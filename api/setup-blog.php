<?php
$host = 'localhost';
$dbname = 'quote_system';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt VARCHAR(500),
        featured_image VARCHAR(255),
        status ENUM('draft', 'published') DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    
    // Add featured_image column if it doesn't exist
    try {
        $pdo->exec("ALTER TABLE blog_posts ADD COLUMN featured_image VARCHAR(255) DEFAULT NULL");
    } catch(PDOException $e) {
        // Column already exists, ignore error
    }
    
    // Create testimonials table
    $sql = "CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        company VARCHAR(100),
        message TEXT NOT NULL,
        rating INT DEFAULT 5,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    $pdo->exec($sql);
    
    echo json_encode(['success' => true, 'message' => 'Blog table created successfully!']);
    
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>