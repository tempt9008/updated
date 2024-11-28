// Initialize PDF.js worker
import { pdf } from '@react-pdf/renderer';

// Ensure PDF rendering works in all environments
if (typeof window !== 'undefined') {
  pdf.initWorker();
}
