/**
 * Platform-specific utilities for icons, colors, and names
 */

import { MessageCircle, Facebook, Instagram } from 'lucide-react';

/**
 * Get icon component for a platform
 * @param {string} platform - Platform name ('whatsapp', 'facebook', 'instagram')
 * @returns {Component} Lucide icon component
 */
export const getPlatformIcon = (platform) => {
  if (!platform) return MessageCircle;

  switch (platform.toLowerCase()) {
    case 'whatsapp':
      return MessageCircle;
    case 'facebook':
    case 'messenger':
      return Facebook;
    case 'instagram':
      return Instagram;
    default:
      return MessageCircle;
  }
};

/**
 * Get color class for a platform
 * @param {string} platform - Platform name
 * @returns {string} Tailwind color class
 */
export const getPlatformColor = (platform) => {
  if (!platform) return 'text-gray-600';

  switch (platform.toLowerCase()) {
    case 'whatsapp':
      return 'text-green-600 dark:text-green-400';
    case 'facebook':
    case 'messenger':
      return 'text-blue-600 dark:text-blue-400';
    case 'instagram':
      return 'text-pink-600 dark:text-pink-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

/**
 * Get background color class for a platform
 * @param {string} platform - Platform name
 * @returns {string} Tailwind background color class
 */
export const getPlatformBgColor = (platform) => {
  if (!platform) return 'bg-gray-100 dark:bg-gray-800';

  switch (platform.toLowerCase()) {
    case 'whatsapp':
      return 'bg-green-100 dark:bg-green-900/30';
    case 'facebook':
    case 'messenger':
      return 'bg-blue-100 dark:bg-blue-900/30';
    case 'instagram':
      return 'bg-pink-100 dark:bg-pink-900/30';
    default:
      return 'bg-gray-100 dark:bg-gray-800';
  }
};

/**
 * Get display name for a platform
 * @param {string} platform - Platform name
 * @returns {string} Formatted platform name
 */
export const getPlatformDisplayName = (platform) => {
  if (!platform) return 'Unknown';

  switch (platform.toLowerCase()) {
    case 'whatsapp':
      return 'WhatsApp';
    case 'facebook':
      return 'Facebook';
    case 'messenger':
      return 'Messenger';
    case 'instagram':
      return 'Instagram';
    default:
      return platform.charAt(0).toUpperCase() + platform.slice(1);
  }
};

/**
 * Get all available platforms
 * @returns {Array} Array of platform objects
 */
export const getAllPlatforms = () => {
  return [
    { id: 'all', name: 'All Platforms', icon: null },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
  ];
};
