<?php
// verification-service/services/verification.service.php

// List of approved university/school email domains.
const APPROVED_DOMAINS = [
	'nau.edu'
    // Add other approved domains here
];

/**
 * Extracts the domain from an email and checks it against the approved list.
 * @param string $email - The email address to validate.
 * @return bool True if the domain is approved, false otherwise.
 */
function isDomainApproved(string $email): bool
{
    $lowerCaseEmail = strtolower($email);
    // Find the position of the last '@' symbol
    $atPosition = strrpos($lowerCaseEmail, '@'); 

    // Check if '@' is present and not at the start or end
    if ($atPosition === false || $atPosition == 0 || $atPosition == (strlen($lowerCaseEmail) - 1)) {
        return false; // Invalid email format
    }

    // Extract the domain part
    $domain = substr($lowerCaseEmail, $atPosition + 1);

    // Check if the extracted domain is in the approved list
    return in_array($domain, APPROVED_DOMAINS);
}