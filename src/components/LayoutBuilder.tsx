'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SectionChips from '../components/SectionChips';

export interface LayoutData {
  mode: 'ai' | 'custom';
  layout: string[];
  notes?: string;
}

interface LayoutBuilderProps {
  initialLayout: LayoutData;
  onLayoutChange?: (newLayout: LayoutData) => void;
}

export default function LayoutBuilder({ initialLayout, onLayoutChange }: LayoutBuilderProps) {
  const [layoutData, setLayoutData] = useState<LayoutData>(initialLayout);

  // Update when initialLayout changes
  useEffect(() => {
    setLayoutData(initialLayout);
  }, [initialLayout]);

  // When the user changes the layout via chips
  const handleLayoutChange = (newSections: string[]) => {
    const newLayout = {
      ...layoutData,
      layout: newSections,
      mode: 'custom' as const // Switch to custom mode when manually rearranged
    };
    
    setLayoutData(newLayout);
    
    // Notify parent component if callback provided
    if (onLayoutChange) {
      onLayoutChange(newLayout);
    }
  };

  return (
    <div className="w-full">
      {/* Chips for editing layout (only show in builder view) */}
      {onLayoutChange && (
        <SectionChips 
          sections={layoutData.layout} 
          onChange={handleLayoutChange}
        />
      )}
      
      {/* Render each section dynamically */}
      <div className="w-full max-w-5xl mx-auto">
        {layoutData.layout.length === 0 ? (
          <div className="w-full py-12 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-600">No sections available. Add a section to get started.</p>
          </div>
        ) : (
          layoutData.layout.map((sectionName, i) => {
            const Section = dynamic(() => import(`../components/layoutBlocks/${sectionName}`).catch(err => {
              console.error(`Error loading ${sectionName}:`, err);
              return () => (
                <div className="w-full py-12 bg-red-50 rounded-lg text-center">
                  <p className="text-red-500">Failed to load section: {sectionName}</p>
                </div>
              );
            }), {
              loading: () => (
                <div className="w-full py-12 bg-gray-100 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400">Loading {sectionName}...</div>
                </div>
              ),
              ssr: false
            });
            return <Section key={i} />;
          })
        )}
      </div>
    </div>
  );
} 