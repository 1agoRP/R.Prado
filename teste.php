<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Requisição POST recebida com sucesso!";
} else {
    echo "Use o método POST.";
}
?>