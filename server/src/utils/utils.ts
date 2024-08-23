import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
/**
 *  Safe JSON.stringify that handles circular references
 * @param obj  The object to stringify
 * @param indent  The number of spaces to use for indentation
 * @returns  The stringified object
 */
export function safeStringify(obj: any, indent: number = 2): string {
  const cache = new Set();
  const retVal = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          return; // Duplicate reference found, discard key
        }
        cache.add(value); // Store value in our collection
      }
      return value;
    },
    indent,
  );
  cache.clear(); // Enable garbage collection
  return retVal;
}

/**
 * Converts an image file to a Base64-encoded string.
 *
 * @param {string} imagePath - The path to the image file.
 * @returns {Promise<string>} - A promise that resolves to the Base64-encoded image string.
 */
export const imageToBase64 = (imagePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        return reject(err);
      }

      const extension = path.extname(imagePath).slice(1); // Get file extension (e.g., 'jpg', 'png')
      const base64Image = `data:image/${extension};base64,${data.toString('base64')}`;
      resolve(base64Image);
    });
  });
};

/**
 * Generates a hash token.
 *
 * @param {number} [length=32] - The length of the token.
 * @returns {string} - The hash token.
 */
export const generateHashToken = (length: number = 32): string => {
  try {
    const resetToken = crypto.randomBytes(length).toString('hex');
    const hash = crypto.createHash('sha256').update(resetToken).digest('hex');
    return hash;
  } catch (error) {
    console.log(error);
  }
};
