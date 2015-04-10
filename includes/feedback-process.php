<?php
include("$_SERVER[DOCUMENT_ROOT]/includes/config.php");

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post)
{
    include 'functions.php';

    $name = stripslashes($_POST['name']);
    $opinion = stripslashes($_POST['opinion']);

    $error = '';

    // Check name

    if(!$name) {
        $error .= 'Por favor, ingrese su nombre.<br />';
    }

    // Check message (length)
    if(!$opinion || strlen($opinion) < 15) {
        $error .= "Por favor, comparta con nosotros su opinión. Debe tener al menos 15 caracteres..<br />";
    }


    if(!$error) {
        $mail = mail(WEBMASTER_EMAIL, 'Feedback', $opinion,
            "X-Mailer: PHP/" . phpversion());
        
        if($mail)
        {
            echo 'OK';
        }
    } else {
        echo '<div class="notification_error">'.$error.'</div>';
    }
}
?>