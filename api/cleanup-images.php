<?php
require_once 'config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    $pdo = getDbConnection();
    
    // Get all image URLs from database
    $usedImages = [];
    
    // Blog images
    $stmt = $pdo->query("SELECT featured_image FROM blog_posts WHERE featured_image IS NOT NULL");
    while ($row = $stmt->fetch()) {
        $usedImages[] = basename($row['featured_image']);
    }
    
    // Gallery images
    $stmt = $pdo->query("SELECT image_url FROM gallery WHERE image_url IS NOT NULL");
    while ($row = $stmt->fetch()) {
        $usedImages[] = basename($row['image_url']);
    }
    
    // Product images
    $stmt = $pdo->query("SELECT image_url FROM products WHERE image_url IS NOT NULL");
    while ($row = $stmt->fetch()) {
        $usedImages[] = basename($row['image_url']);
    }
    
    // Product gallery images
    $stmt = $pdo->query("SELECT image_url FROM product_gallery WHERE image_url IS NOT NULL");
    while ($row = $stmt->fetch()) {
        $usedImages[] = basename($row['image_url']);
    }
    
    // Client logos
    $stmt = $pdo->query("SELECT logo_url FROM clients WHERE logo_url IS NOT NULL");
    while ($row = $stmt->fetch()) {
        $usedImages[] = basename($row['logo_url']);
    }
    
    // Slider images
    $stmt = $pdo->query("SELECT image_url FROM sliders WHERE image_url IS NOT NULL");
    while ($row = $stmt->fetch()) {
        $usedImages[] = basename($row['image_url']);
    }
    
    $usedImages = array_unique($usedImages);
    
    // Get all files in uploads directory
    $uploadsDir = 'uploads/';
    $allFiles = [];
    if (is_dir($uploadsDir)) {
        $files = scandir($uploadsDir);
        foreach ($files as $file) {
            if ($file != '.' && $file != '..' && is_file($uploadsDir . $file)) {
                $allFiles[] = $file;
            }
        }
    }
    
    // Find unused files
    $unusedFiles = array_diff($allFiles, $usedImages);
    
    $action = $_GET['action'] ?? 'list';
    
    if ($action === 'delete' && !empty($unusedFiles)) {
        $deleted = [];
        foreach ($unusedFiles as $file) {
            $filePath = $uploadsDir . $file;
            if (unlink($filePath)) {
                $deleted[] = $file;
            }
        }
        echo json_encode(['success' => true, 'deleted' => $deleted, 'count' => count($deleted)]);
    } else {
        echo json_encode(['unused_files' => array_values($unusedFiles), 'count' => count($unusedFiles)]);
    }
    
} catch(Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>