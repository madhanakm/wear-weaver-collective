<?php
require_once 'config/database.php';

try {
    $pdo = getDbConnection();
    
    // Fix old domain URLs to relative paths
    $oldDomains = ['http://localhost/api/', 'https://ai.thinkaside.com/', 'http://localhost/', 'https://ai.thinkaside.com/api/'];
    
    foreach ($oldDomains as $oldDomain) {
        // Fix products table
        $stmt = $pdo->prepare("UPDATE products SET image_url = REPLACE(image_url, ?, '')");
        $stmt->execute([$oldDomain]);
        
        // Fix gallery table
        $stmt = $pdo->prepare("UPDATE gallery SET image_url = REPLACE(image_url, ?, '')");
        $stmt->execute([$oldDomain]);
        
        // Fix blog_posts table
        $stmt = $pdo->prepare("UPDATE blog_posts SET featured_image = REPLACE(featured_image, ?, '')");
        $stmt->execute([$oldDomain]);
        
        // Fix clients table
        $stmt = $pdo->prepare("UPDATE clients SET logo_url = REPLACE(logo_url, ?, '')");
        $stmt->execute([$oldDomain]);
        
        // Fix product_gallery table
        $stmt = $pdo->prepare("UPDATE product_gallery SET image_url = REPLACE(image_url, ?, '')");
        $stmt->execute([$oldDomain]);
        
        // Fix sliders table
        $stmt = $pdo->prepare("UPDATE sliders SET image_url = REPLACE(image_url, ?, '')");
        $stmt->execute([$oldDomain]);
    }
    
    echo "Fixed all image URLs to relative paths for new domain!\n";
    
    // Count total fixed
    $tables = ['products', 'gallery', 'blog_posts', 'clients', 'product_gallery', 'sliders'];
    foreach ($tables as $table) {
        $stmt = $pdo->query("SELECT COUNT(*) FROM $table");
        echo "$table: " . $stmt->fetchColumn() . " records\n";
    }
    
    echo "All image URLs updated successfully!";
    
} catch(Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>