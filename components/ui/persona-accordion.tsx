'use client';

import { useState } from 'react';

interface PersonaAccordionProps {
  label: string;
  items: string[];
}

export default function PersonaAccordion({ label, items }: PersonaAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left text-lg font-semibold"
      >
        {label}
        <span>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
          {items.map((txt) => (
            <li key={txt}>{txt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}