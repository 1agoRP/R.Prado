<?php

$nome = addcslashes($_POST['nome']);
$email = addcslashes($_POST['email']);
$telefone = addcslashes($_POST['telefone']);

$para = "iagopradoiago@hotmail.com";
$assunto = "Solicitação de Orçamento - R. Prado";

$corpo = "Nome: ".$nome."\n"."E-mail: ".$email."\n"."Telefone: ".$telefone;

$cabeca = "From: iagopradoiago@hotmail.com"."\n"."Reply-to: ".$email."\n"."X=Mailer:PHP/".phpversion();

if(mail($para,$assunto,$corpo,$cabeca)){
    echo("E-mail enviado com sucesso! Logo você receberá um retorno do Iago R. Prado");
}else{
    echo("Houve um erro no envio da sua solicitação, verifique os dados informados e tente novamente.");
}