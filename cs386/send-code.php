<?php
// verification-service/routes/send-code.php

// Load Composer's autoloader (required for PHPMailer)
require_once(__DIR__ . '/../vendor/autoload.php'); 

// Start session for temporary code storage (replaces TEMPORARY_CODE_STORE)
session_start();

// Set response header
header('Content-Type: application/json');

// --- Import Logic ---
require_once('../services/verification.service.php');
require_once('../services/email.service.php'); 


// --- 1. Input Parsing ---
$json_data = file_get_contents('php://input');
$request_data = json_decode($json_data, true); 
$email = $request_data['email'] ?? null;

if (!$email) {
    http_response_code(400); 
    echo json_encode(['success' => false, 'message' => 'Email is required for verification.']);
    exit;
}

// --- 2. Domain Check ---
if (isDomainApproved($email)) {

    // --- Code Generation ---
    function generateCode() {
        return strval(rand(100000, 999999));
    }

    $code = generateCode();
    // PHP uses seconds for time()
    $expirationTime = time() + (10 * 60); // 10 minutes from now

    // --- 3. Store Code in Session ---
    // Use VERIFICATION_CODE_STORE as the key, just like your JS
    $_SESSION['VERIFICATION_CODE_STORE'][$email] = [
        'code' => $code,
        'expires' => $expirationTime
    ];

    // --- 4. Email Sending ---
    try {
        sendVerificationEmail($email, $code);
    } 
    catch (Exception $err) {
        error_log("Email send failed: " . $err->getMessage());
        // Clean up temp code if email fails
        unset($_SESSION['VERIFICATION_CODE_STORE'][$email]);
        http_response_code(500);
        echo json_encode(['msg' => 'Verification failed: Could not send email.']);
        exit;
    }

    // --- 5. Success Response ---
    http_response_code(200);
    echo json_encode([
        'msg' => "A verification code has been sent to $email. Please check your inbox.",
    ]);

} else {
    // Domain is not approved
    http_response_code(403);
    echo json_encode([
        'msg' => 'Your email domain is not recognized. Cannot send code.',
    ]);
}
