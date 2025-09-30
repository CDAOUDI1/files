/**
 * URL constants for ENSABM Student Space
 */

export const URLS = {
  // Main URLs
  STUDENT_SPACE: 'https://ensabm.usms.ac.ma/espace_etudiant/index.php',
  BASE_URL: 'https://ensabm.usms.ac.ma',
  
  // Quick Access URLs
  GRADES: 'https://ensabm.usms.ac.ma/espace_etudiant/notes.php',
  SCHEDULE: 'https://ensabm.usms.ac.ma/espace_etudiant/emploi.php',
  ATTENDANCE: 'https://ensabm.usms.ac.ma/espace_etudiant/absences.php',
  DOCUMENTS: 'https://ensabm.usms.ac.ma/espace_etudiant/documents.php',
  
  // External URLs
  ENSABM_WEBSITE: 'https://ensabm.usms.ac.ma',
  HELP_URL: 'https://ensabm.usms.ac.ma/aide.php',
};

// Allowed domains for WebView navigation
export const ALLOWED_DOMAINS = [
  'ensabm.usms.ac.ma',
  'usms.ac.ma',
];

// External domains that should open in external browser
export const EXTERNAL_DOMAINS = [
  'google.com',
  'facebook.com',
  'twitter.com',
  'youtube.com',
];

export default URLS;
