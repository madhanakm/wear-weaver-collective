<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config/database.php';

$path = $_GET['path'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDbConnection();
    
    if ($path === 'scan' && $method === 'GET') {
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
        
        echo json_encode(['success' => true, 'unused_files' => array_values($unusedFiles), 'count' => count($unusedFiles)]);
        
    } elseif ($path === 'delete' && $method === 'POST') {
        // Get unused files first
        $usedImages = [];
        
        $stmt = $pdo->query("SELECT featured_image FROM blog_posts WHERE featured_image IS NOT NULL");
        while ($row = $stmt->fetch()) {
            $usedImages[] = basename($row['featured_image']);
        }
        
        $stmt = $pdo->query("SELECT image_url FROM gallery WHERE image_url IS NOT NULL");
        while ($row = $stmt->fetch()) {
            $usedImages[] = basename($row['image_url']);
        }
        
        $stmt = $pdo->query("SELECT image_url FROM products WHERE image_url IS NOT NULL");
        while ($row = $stmt->fetch()) {
            $usedImages[] = basename($row['image_url']);
        }
        
        $stmt = $pdo->query("SELECT image_url FROM product_gallery WHERE image_url IS NOT NULL");
        while ($row = $stmt->fetch()) {
            $usedImages[] = basename($row['image_url']);
        }
        
        $stmt = $pdo->query("SELECT logo_url FROM clients WHERE logo_url IS NOT NULL");
        while ($row = $stmt->fetch()) {
            $usedImages[] = basename($row['logo_url']);
        }
        
        $stmt = $pdo->query("SELECT image_url FROM sliders WHERE image_url IS NOT NULL");
        while ($row = $stmt->fetch()) {
            $usedImages[] = basename($row['image_url']);
        }
        
        $usedImages = array_unique($usedImages);
        
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
        
        $unusedFiles = array_diff($allFiles, $usedImages);
        
        $deleted = [];
        foreach ($unusedFiles as $file) {
            $filePath = $uploadsDir . $file;
            if (unlink($filePath)) {
                $deleted[] = $file;
            }
        }
        
        echo json_encode(['success' => true, 'deleted' => $deleted, 'count' => count($deleted)]);
    }
    
} catch(Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>