// server/src/services/verification.service.js

// List of approved university/school email domains.
// This list is the core of your email verification logic.
const APPROVED_DOMAINS = [
    'student.university.edu',
    'student.college.ac.uk',
    'myuniversity.ca',
    'schoolname.org',
    // Add all other approved domains here
];

/**
 * Extracts the domain from an email and checks it against the approved list.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the domain is approved, false otherwise.
 */
const isDomainApproved = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }

    // 1. Convert to lowercase and find the index of the '@' symbol
    const lowerCaseEmail = email.toLowerCase();
    const atIndex = lowerCaseEmail.lastIndexOf('@');

    // 2. Check if '@' is present and not the first or last character
    if (atIndex <= 0 || atIndex === lowerCaseEmail.length - 1) {
        return false; // Invalid email format
    }

    // 3. Extract the domain part (everything after the last '@')
    const domain = lowerCaseEmail.substring(atIndex + 1);

    // 4. Check if the extracted domain is in the approved list
    return APPROVED_DOMAINS.includes(domain);
};


module.exports = {
    isDomainApproved,
    // Other verification logic will go here later (e.g., token generation)
};
