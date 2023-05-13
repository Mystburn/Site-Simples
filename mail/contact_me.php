<?php

	if( empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) 
	{
		http_response_code(500);
		exit(0);
	}
	else
	{

		$name 			= strip_tags( htmlspecialchars( $_POST['name'] ) );
		$email 			= strip_tags( htmlspecialchars( $_POST['email'] ) );
		$phone 			= strip_tags( htmlspecialchars( $_POST['phone'] ) );
		$message 		= strip_tags( htmlspecialchars( $_POST['message'] ) );

		$to 		= "contato@crcoberturaerevestimento.com.br";
		$subject	= "C.R coberturas e revestimentos Website - Contato";

		$body = "Novo cadastro efetuado pelo website.<br><br>Detalhes do cadastro:<br><br>";
		$body.= "Nome: <b>".$name."</b><br>";
		$body.= "Email: <b>".$email."</b><br>";
		$body.= "Telefone: <b>".$phone."</b><br>";
		$body.= "Mensagem: <b>".$message."</b><br>";

		$header = "From: contato@crcoberturaerevestimento.com.br\n";
		$header .= "Reply-To: $email";	
        $header .= "MIME-Version: 1.0\r\n";
        $header .= "Content-Type: text/html; charset=UTF-8\r\n";

			if( !mail($to, $subject, $body, $header) )
			{
				http_response_code(500);
				exit(0);
			}
			
	}
?>
