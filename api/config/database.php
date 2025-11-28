<?php
$DB_CONFIG = [
    'host' => 'localhost',
    'dbname' => 'quote_system',
    'username' => 'root',
    'password' => ''
];

function getDbConnection() {
    global $DB_CONFIG;
    try {
        $pdo = new PDO(
            "mysql:host={$DB_CONFIG['host']};dbname={$DB_CONFIG['dbname']}", 
            $DB_CONFIG['username'], 
            $DB_CONFIG['password']
        );
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch(PDOException $e) {
        throw new Exception('Database connection failed: ' . $e->getMessage());
    }
}
?>