import { PDFWorker } from '@react-pdf/renderer';

// Configure PDF worker
if (typeof window !== 'undefined') {
  const worker = new PDFWorker();
  worker.setup();
}