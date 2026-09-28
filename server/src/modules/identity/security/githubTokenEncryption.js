import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

import { env } from "../../../app/index.js";
import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";

/**
 * It is mandatory that i get to study this
 * file to understand it.
 *
 * #### How this works
 *
 * 1. A random initialization vector (IV) is generated for each encryption.
 * 2. The token is encrypted using the 32-byte key from your environment configuration.
 * 3. The IV, authentication tag, and ciphertext are stored together in a versioned string.
 * 4. When the backend needs the token, it decrypts the stored value using the same key.
 *
 * The encryption key itself is never stored in MongoDB.
 */

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

const getEncryptionKey = () =>
	Buffer.from(env.github.tokenEncryptionKey, "hex");

/**
 * Encrypt a GitHub Personal Access Token.
 *
 * Returns a versioned string containing the IV, authentication tag,
 * and encrypted token, encoded as hexadecimal.
 */
export function encryptGitHubToken(token) {
	if (typeof token !== "string" || !token.trim()) {
		throw new AppError(
			"A valid GitHub token is required.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	const iv = randomBytes(IV_LENGTH);

	const cipher = createCipheriv(ALGORITHM, getEncryptionKey(), iv);

	const encrypted = Buffer.concat([
		cipher.update(token, "utf8"),
		cipher.final(),
	]);

	const authTag = cipher.getAuthTag();

	return [
		"v1",
		iv.toString("hex"),
		authTag.toString("hex"),
		encrypted.toString("hex"),
	].join(":");
}

/**
 * Decrypt a token previously encrypted by encryptGitHubToken().
 */
export function decryptGitHubToken(encryptedToken) {
	if (typeof encryptedToken !== "string") {
		throw new AppError(
			"A valid encrypted GitHub token is required.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	const [version, ivHex, authTagHex, encryptedHex] =
		encryptedToken.split(":");

	if (version !== "v1" || !ivHex || !authTagHex || !encryptedHex) {
		throw new AppError(
			"Invalid encrypted GitHub token format.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	const iv = Buffer.from(ivHex, "hex");
	const authTag = Buffer.from(authTagHex, "hex");
	const encrypted = Buffer.from(encryptedHex, "hex");

	if (
		iv.length !== IV_LENGTH ||
		authTag.length !== AUTH_TAG_LENGTH ||
		encrypted.length === 0
	) {
		throw new AppError(
			"Invalid encrypted GitHub token data.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	const decipher = createDecipheriv(ALGORITHM, getEncryptionKey(), iv);

	decipher.setAuthTag(authTag);

	const decrypted = Buffer.concat([
		decipher.update(encrypted),
		decipher.final(),
	]);

	return decrypted.toString("utf8");
}
