<?php
require_once 'config/database.php';

try {
    $pdo = getDbConnection();
    
    // Fix products table
    $stmt = $pdo->prepare("UPDATE products SET image_url = REPLACE(image_url, 'http://localhost/api/uploads/', '/uploads/')");
    $stmt->execute();
    echo "Fixed " . $stmt->rowCount() . " product images\n";
    
    // Fix gallery table
    $stmt = $pdo->prepare("UPDATE gallery SET image_url = REPLACE(image_url, 'http://localhost/api/uploads/', '/uploads/')");
    $stmt->execute();
    echo "Fixed " . $stmt->rowCount() . " gallery images\n";
    
    // Fix blog_posts table
    $stmt = $pdo->prepare("UPDATE blog_posts SET featured_image = REPLACE(featured_image, 'http://localhost/api/uploads/', '/uploads/')");
    $stmt->execute();
    echo "Fixed " . $stmt->rowCount() . " blog images\n";
    
    // Fix clients table
    $stmt = $pdo->prepare("UPDATE clients SET logo_url = REPLACE(logo_url, 'http://localhost/api/uploads/', '/uploads/')");
    $stmt->execute();
    echo "Fixed " . $stmt->rowCount() . " client logos\n";
    
    // Fix product_gallery table
    $stmt = $pdo->prepare("UPDATE product_gallery SET image_url = REPLACE(image_url, 'http://localhost/api/uploads/', '/uploads/')");
    $stmt->execute();
    echo "Fixed " . $stmt->rowCount() . " product gallery images\n";
    
    echo "All image URLs updated successfully!";
    
} catch(Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>