<?
	if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['email'])&&$_POST['email']!="")&&(isset($_POST['message'])&&$_POST['message']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")&&(isset($_POST['email_send'])&&$_POST['email_send']!="")&&(isset($_POST['theme']))){
		$to = $_POST['email_send'];
		$subject = $_POST['theme'];
		$message = '
			<html>
                <head>
                    <title>'.$subject.'</title>
                </head>
                <body>
                    <p>Имя: '.$_POST['name'].'</p>    
                    <p>Email: '.$_POST['email'].'</p>
                    <p>Телефон: '.$_POST['phone'].'</p>
                    <p>Сообщение: '.$_POST['message'].'</p>                     
                </body>
            </html>
		';
		$headers  = "Content-type: text/html; charset=utf-8 \r\n";
		$headers .= "From:" . $_POST['email'] . "\r\n ";
		if(mail($to, $subject, $message, $headers)){
			echo 'success';
		}else{
			echo 'error';
		}
	}
	
	ini_set('display_errors','On');
	error_reporting('E_ALL');
?>