/**
 * File Upload Validation and Utilities
 * Handles file validation, type detection, and size limits
 */

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed file types
const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  audio: ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'],
  document: [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

/**
 * Validate file before upload
 * @param {File} file - File object to validate
 * @throws {Error} If file is invalid
 * @returns {boolean} True if valid
 */
export const validateFile = (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }

  // Check file type
  const allAllowedTypes = [
    ...ALLOWED_TYPES.image,
    ...ALLOWED_TYPES.audio,
    ...ALLOWED_TYPES.document,
  ];

  if (!allAllowedTypes.includes(file.type)) {
    throw new Error('File type not supported. Allowed: images, audio, and documents.');
  }

  return true;
};

/**
 * Get file type category from file MIME type
 * @param {File} file - File object
 * @returns {string} File type category ('image', 'audio', 'document')
 */
export const getFileType = (file) => {
  if (!file || !file.type) return 'document';

  if (ALLOWED_TYPES.image.includes(file.type)) return 'image';
  if (ALLOWED_TYPES.audio.includes(file.type)) return 'audio';
  return 'document';
};

/**
 * Format file size to human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., "2.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Get file extension from filename
 * @param {string} filename - File name
 * @returns {string} File extension (e.g., "jpg")
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

/**
 * Check if file is an image
 * @param {File} file - File object
 * @returns {boolean} True if image
 */
export const isImageFile = (file) => {
  return file && ALLOWED_TYPES.image.includes(file.type);
};

/**
 * Check if file is an audio file
 * @param {File} file - File object
 * @returns {boolean} True if audio
 */
export const isAudioFile = (file) => {
  return file && ALLOWED_TYPES.audio.includes(file.type);
};

/**
 * Check if file is a document
 * @param {File} file - File object
 * @returns {boolean} True if document
 */
export const isDocumentFile = (file) => {
  return file && ALLOWED_TYPES.document.includes(file.type);
};

/**
 * Create a preview URL for image files
 * @param {File} file - Image file
 * @returns {string|null} Object URL for preview or null
 */
export const createImagePreview = (file) => {
  if (!isImageFile(file)) return null;
  return URL.createObjectURL(file);
};

/**
 * Revoke object URL to free memory
 * @param {string} url - Object URL to revoke
 */
export const revokePreviewUrl = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};
