<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    echo json_encode(['message' => "Olá, $nome!"]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}
?>
