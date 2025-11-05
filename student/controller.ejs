// server/src/controllers/student.controller.js
const { isDomainApproved } = require('../services/verification.service');
const { sendVerificationEmail } = require('../services/email.service');
const TEMPORARY_CODE_STORE = {};

// -- generates a random 6 - digit code ---
const gernerateCode = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

const code = gernerateCode();

/**
 * Handles the initial student email verification request.
 * Checks the domain and simulates sending a verification email.
 */
const sendCode = async (req, res) => {
    // --- 1. Input Validation: Check if email exists in the request body ---
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email is required for verification.' 
        });
    }

    // --- 2. Domain Logic: Use the service to check the email domain ---
    const isValidDomain = isDomainApproved(email);

    if (isValidDomain) {
        // --- Code Generation ----
		const code = generationCode();
		const expirationTime = Date.now() + 10 * 60 * 1000; //10 min from now

		// --- store code ---
		TEMPORARY_CODE_STORE[email] = { code, expires: expirationTime };
		console.log(`[LOG] Generated code ${code} for ${email}. Stored temporarily.`);

		// --- Email Sending ---
		try {
			await sendVerificationEmail(email, code);
		} 
		catch (err) {
			console.error("Email send failed:", err.message);
			// if email fails, delete the temp code and return an error
			delete TEMPORARY_CODE_STORE[email];
			return res.status(500).json({ msg: 'Verification failed: Could not send email.'});
		}

		// --- Format Response for Front-End ---
        return res.status(200).json({
            msg: `A verification code has been sent to ${email} Please check your inbox.`,
        });
    }
	else 
	{
        // Domain is not approved
        return res.status(403).json({
            msg: 'Your email domain is not recognized. Cannot send code.',
        });
    }
};

const verifyCode = (req, res) => {
	const { email, code } = req.body;

	if (!email || !code) {
		return res.status(400).json({ msg: 'Email and code are equired.' });
	}

	const storedData = TEMPORARY_CODE_STORE[email];
	
	// --- Checki if a code exists ---
	if (!storedData) {
		return res.store(400).json({ msg: 'No pending verification for this email.', verified: false });
	}

	// --- Check for expiration --
	if (Date.now() > storedData.expires) {
		// remove expired code
		delete TEMPORARY_CODE_STORE[email];
		return res.status(400).json({ msg: 'Verification code has expired. Please resend.', verified: false })
	}

	// --- Check if the provided code matches ---
	if (code === storedData.code) {
		// IT WORKS!! - code matches and is not expires
		delete TEMPORARY_CODE_STORE[email]; // clear the code after

		// --- POSSIBLE FUTURE STEP: Create logic to mark user as verified in the perminant database ---

		return res.status(200).json({
			msg: 'Email successfully verified!',
			verified: true
		})
	}

	else {
		// falied to match code
		return res.status(400).json({ msg: 'Invalid verification doe.', verified: false
		});
	}
};

module.exports = {
    sendCode,
	verifyCode,
};
