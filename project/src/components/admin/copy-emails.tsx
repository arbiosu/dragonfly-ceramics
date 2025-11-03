'use client';

import { useState } from 'react';
import { ListContactsResponse } from 'resend';

export function CopyEmailsButton({
  subscribers,
}: {
  subscribers: ListContactsResponse;
}) {
  const [copied, setCopied] = useState(false);

  const copyEmails = async () => {
    const emailList = subscribers.data?.data
      .map((contact) => contact.email)
      .filter(Boolean)
      .join('\n');

    if (emailList == null) return;

    try {
      await navigator.clipboard.writeText(emailList);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy emails:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = emailList;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className='mb-6 text-center'>
      <button
        onClick={copyEmails}
        className='rounded bg-dfNew2 px-4 py-2 text-black transition duration-300 hover:scale-105'
      >
        {copied ? 'Copied!' : 'Copy All Emails'}
      </button>
    </div>
  );
}
