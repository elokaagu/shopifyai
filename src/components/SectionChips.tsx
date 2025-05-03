'use client';

import { useState } from 'react';

interface SectionChipsProps {
  sections: string[];
  onChange: (newSections: string[]) => void;
}

export default function SectionChips({ sections, onChange }: SectionChipsProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const newSections = [...sections];
    const draggedSection = newSections[draggedItem];
    
    // Remove the dragged item
    newSections.splice(draggedItem, 1);
    // Insert at the new position
    newSections.splice(index, 0, draggedSection);
    
    onChange(newSections);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleRemove = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    onChange(newSections);
  };

  const sectionOptions = [
    "HeroSection", 
    "ProductGrid", 
    "StorySection", 
    "TestimonialSection", 
    "CTASection", 
    "FooterSection"
  ];

  const handleAdd = (section: string) => {
    if (!sections.includes(section)) {
      onChange([...sections, section]);
    }
  };

  const availableSections = sectionOptions.filter(section => !sections.includes(section));

  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700 mb-8">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-sm font-medium mb-3 text-gray-600 dark:text-gray-300">Layout Structure (drag to reorder)</h3>
        
        {/* Current sections as draggable chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sections.map((section, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                draggedItem === index
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600'
              } cursor-grab shadow-sm`}
            >
              <span>{section.replace('Section', '')}</span>
              <button
                onClick={() => handleRemove(index)}
                className="ml-1 w-4 h-4 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                aria-label={`Remove ${section}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add section dropdown */}
        {availableSections.length > 0 && (
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              onChange={(e) => e.target.value && handleAdd(e.target.value)}
              value=""
            >
              <option value="" disabled>Add section...</option>
              {availableSections.map((section) => (
                <option key={section} value={section}>
                  {section.replace('Section', '')}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
} 