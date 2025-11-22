<?php
// verification-service/services/email.service.php

// Load Composer's autoloader relative to the project root
// __DIR__ goes up two levels from services/ to the verification-service/ root, then finds vendor/
require_once(__DIR__ . '/../vendor/autoload.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * Send verification email using PHPMailer via SMTP.
 * @param string $recipientEmail The address to send the code to.
 * @param string $code The 6-digit verification code.
 * @throws Exception if the email fails to send.
 */
function sendVerificationEmail(string $recipientEmail, string $code) {
    
    $mail = new PHPMailer(true); 

    try {
        // Server Configuration
		// ----if configuration does not work check these lines first -----
        $mail->isSMTP();                                   
        $mail->Host       = 'in-smtp.mailjet.com';
        $mail->SMTPAuth   = true;                          
        $mail->Username   = '99ad361d467f09a526d9da590681ff88';
        $mail->Password   = 'c781f67d8496ee32dc36f67459d67913';          // e.g., SMTP Password or App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port       = 587;                           

        // Recipients and Content
        $mail->setFrom('no-reply@yourdomain.com', 'Verification Team');
        $mail->addAddress($recipientEmail); 

        $mail->isHTML(true); 
        $mail->Subject = 'Your Verification Code';
        $mail->Body    = "Your verification code is: <strong>$code</strong>. This code expires in 10 minutes.";
        $mail->AltBody = "Your verification code is: $code. This code expires in 10 minutes."; 

        $mail->send();
    } catch (Exception $e) {
        error_log("PHPMailer Error: {$mail->ErrorInfo}");
        // Re-throw exception for the controller to catch
        throw new Exception("Could not send email. Mailer Error: {$mail->ErrorInfo}");
    }
}