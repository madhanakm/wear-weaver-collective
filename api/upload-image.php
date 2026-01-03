<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$uploadDir = __DIR__ . '/uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
    chmod($uploadDir, 0755);
}

if (!isset($_FILES['image'])) {
    echo json_encode(['error' => 'No file uploaded']);
    exit;
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

if (!in_array($file['type'], $allowedTypes)) {
    echo json_encode(['error' => 'Invalid file type']);
    exit;
}

if ($file['size'] > 5 * 1024 * 1024) {
    echo json_encode(['error' => 'File too large (max 5MB)']);
    exit;
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid() . '.' . $extension;
$filepath = $uploadDir . $filename;

error_log('Attempting to upload file to: ' . $filepath);
if (move_uploaded_file($file['tmp_name'], $filepath)) {
    chmod($filepath, 0644);
    error_log('File uploaded successfully: ' . $filepath);
    $url = 'uploads/' . $filename;
    echo json_encode(['success' => true, 'url' => $url]);
} else {
    $error = error_get_last();
    error_log('Upload failed: ' . ($error['message'] ?? 'Unknown error'));
    echo json_encode(['error' => 'Upload failed: ' . ($error['message'] ?? 'Unknown error')]);
}
?>