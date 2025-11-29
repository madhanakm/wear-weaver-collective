<?php
$DB_CONFIG = [
    'host' => 'localhost',
    'dbname' => 'nsg',
    'username' => 'nsg',
    'password' => 'nsg'
];

function getDbConnection() {
    global $DB_CONFIG;
    try {
        $pdo = new PDO(
            "mysql:host={$DB_CONFIG['host']};dbname={$DB_CONFIG['dbname']};charset=utf8mb4", 
            $DB_CONFIG['username'], 
            $DB_CONFIG['password'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        return $pdo;
    } catch(PDOException $e) {
        error_log('Database connection failed: ' . $e->getMessage());
        throw new Exception('Database connection failed');
    }
}
?>