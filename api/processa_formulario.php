<?php
// Sanitização e validação das entradas
$nome = htmlspecialchars($_POST['nome'], ENT_QUOTES, 'UTF-8');
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$telefone = htmlspecialchars($_POST['telefone'], ENT_QUOTES, 'UTF-8');

if (!$nome || !$email || !$telefone) {
    echo("Erro: Por favor, preencha todos os campos corretamente.");
    exit;
}

// Configuração do e-mail
$para = "iagopradoiago@hotmail.com";
$assunto = "Solicitação de Orçamento - R. Prado";
$corpo = "Nome: " . $nome . "\n" . "E-mail: " . $email . "\n" . "Telefone: " . $telefone;
$cabeca = "From: iagopradoiago@hotmail.com" . "\n" . 
          "Reply-To: " . $email . "\n" . 
          "X-Mailer: PHP/" . phpversion();

// Envio do e-mail
if (mail($para, $assunto, $corpo, $cabeca)) {
    echo("E-mail enviado com sucesso! Logo você receberá um retorno do Iago R. Prado.");
} else {
    echo("Houve um erro no envio da sua solicitação. Tente novamente mais tarde.");
}
?>
