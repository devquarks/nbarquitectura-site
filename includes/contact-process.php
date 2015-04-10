<?php
include dirname(dirname(__FILE__)).'/config.php';

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post)
{
include 'functions.php';

$name = stripslashes($_POST['name']);
$email = trim($_POST['email']);
$subject = stripslashes($_POST['subject']);
$message = stripslashes($_POST['message']);


$error = '';

// Check name

if(!$name)
{
$error .= 'Por favor, ingrese su nombre.<br />';
}

// Check email

if(!$email)
{
$error .= 'Por favor, ingrese una dirección de correo electrónico.<br />';
}

if($email && !ValidateEmail($email))
{
$error .= 'Por favor, ingrese una dirección de correo electrónico válida.<br />';
}

// Check message (length)

if(!$message || strlen($message) < 15)
{
$error .= "Por favor, ingrese un mensaje. El mismo debe tener al menos 15 caracteres.<br />";
}


if(!$error)
{
$mail = mail(WEBMASTER_EMAIL, $subject, $message,
     "From: ".$name." <".$email.">\r\n"
    ."Reply-To: ".$email."\r\n"
    ."X-Mailer: PHP/" . phpversion());


if($mail)
{
echo 'OK';
}

}
else
{
echo '<div class="notification_error">'.$error.'</div>';
}

}
?>