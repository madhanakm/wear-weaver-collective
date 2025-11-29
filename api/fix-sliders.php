<?php
require_once 'config/database.php';

try {
    $pdo = getDbConnection();
    
    // Add missing columns to sliders table
    $pdo->exec("ALTER TABLE sliders ADD COLUMN IF NOT EXISTS button_text_2 VARCHAR(100)");
    $pdo->exec("ALTER TABLE sliders ADD COLUMN IF NOT EXISTS button_link_2 VARCHAR(255)");
    
    echo json_encode(['success' => true, 'message' => 'Slider columns added successfully!']);
    
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>