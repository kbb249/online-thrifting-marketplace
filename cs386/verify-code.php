<?php
// verification-service/routes/verify-code.php

// Start session to access the temporary store
session_start();

// Set response header
header('Content-Type: application/json');

// Input Parsing
$json_data = file_get_contents('php://input');
$request_data = json_decode($json_data, true);

$email = $request_data['email'] ?? null;
$code = $request_data['code'] ?? null;

if (!$email || !$code) {
    http_response_code(400);
    echo json_encode(['msg' => 'Email and code are required.', 'verified' => false]);
    exit;
}

// Check for stored data
$storedData = $_SESSION['VERIFICATION_CODE_STORE'][$email] ?? null;

// Check if a code exists
if (!$storedData) {
    http_response_code(400);
    echo json_encode(['msg' => 'No pending verification for this email.', 'verified' => false]);
    exit;
}

// Check for expiration
if (time() > $storedData['expires']) {
    // remove expired code
    unset($_SESSION['VERIFICATION_CODE_STORE'][$email]);
    http_response_code(400);
    echo json_encode(['msg' => 'Verification code has expired. Please resend.', 'verified' => false]);
    exit;
}

// Check if the provided code matches
if ($code === $storedData['code']) {
    // Success! Clear the code after use
    unset($_SESSION['VERIFICATION_CODE_STORE'][$email]); 


    http_response_code(200);
    echo json_encode([
        'msg' => 'Email successfully verified!',
        'verified' => true
    ]);
} else {
    // failed to match code
    http_response_code(400);
    echo json_encode(['msg' => 'Invalid verification code.', 'verified' => false]);
}