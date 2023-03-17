import { useEffect, useState } from 'react';

const useSanitize = (text: string) => {
  const [sanitizedText, setSanitizedText] = useState('');

  useEffect(() => {
    async function sanitizeText() {
      if (typeof window !== 'undefined') {
        const DOMPurify = (await import('dompurify')).default;
        setSanitizedText(DOMPurify.sanitize(text));
      }
    }
    sanitizeText();
  }, [text]);

  return sanitizedText;
};

export default useSanitize;
