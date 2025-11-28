<?php
require_once 'config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$conn = getDbConnection();
$path = $_GET['path'] ?? '';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if ($path === 'public') {
            $stmt = $conn->prepare("SELECT * FROM clients WHERE status = 'active' ORDER BY created_at DESC");
            $stmt->execute();
            $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($clients);
        } else {
            $stmt = $conn->prepare("SELECT * FROM clients ORDER BY created_at DESC");
            $stmt->execute();
            $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($clients);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("INSERT INTO clients (name, logo_url, status) VALUES (?, ?, ?)");
        $result = $stmt->execute([$data['name'], $data['logo_url'], $data['status'] ?? 'active']);
        echo json_encode(['success' => $result]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE clients SET name = ?, logo_url = ?, status = ? WHERE id = ?");
        $result = $stmt->execute([$data['name'], $data['logo_url'], $data['status'], $data['id']]);
        echo json_encode(['success' => $result]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $conn->prepare("DELETE FROM clients WHERE id = ?");
        $result = $stmt->execute([$id]);
        echo json_encode(['success' => $result]);
        break;
}
?>