<?php

function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["message"])) {

	$option = test_input($_POST["chosenOption"]);

	$name = test_input($_POST["name"]);

	$email = test_input($_POST["email"]);

	$message = test_input($_POST["message"]);

	$subject = test_input($_POST["subject"]);

	$messageText = "<b>Name:</b> ".$name." <br><b>Email:</b> ".$email." <p>".$message."</p>"." <p>".$option."</p>";


	date_default_timezone_set('Etc/UTC');

	require __DIR__ . '/libs/phpmailer/PHPMailerAutoload.php';
	//Create a new PHPMailer instance
	$mail = new PHPMailer;
	//Tell PHPMailer to use SMTP
	$mail->isSMTP();
	//Enable SMTP debugging
	// 0 = off (for production use)
	// 1 = client messages
	// 2 = client and server messages
	//$mail->SMTPDebug = 2;
	//Ask for HTML-friendly debug output
	//$mail->Debugoutput = "html";
	//Set the hostname of the mail server
	$mail->Host = "smtp.gmail.com";

	//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
	$mail->Port = 587;
	//Set the encryption system to use - ssl (deprecated) or tls
	$mail->SMTPSecure = "tls";
	//Whether to use SMTP authentication
	$mail->SMTPAuth = true;
	//Username to use for SMTP authentication - use full email address for gmail
	$mail->Username = "rhinotesttask@gmail.com";
	//Password to use for SMTP authentication
	$mail->Password = "test123temp";


	//Set who the message is to be sent from
	$mail->setFrom("$email");
	$mail->AddReplyTo("$email", "$name");

	//Set who the message is to be sent to
	$mail->addAddress("rhinotesttask@gmail.com", "John Doe");
	//Set the subject line
	$mail->Subject = "$subject";

	$mail->msgHTML("<div> $messageText </div>");

	if (!$mail->send()) {
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		echo "Message sent! ";
		echo "<a href=\"index.php?id=contact\">Return back!</a>";
	}
	exit;
}


