'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LayoutBuilder, { LayoutData } from '../../components/LayoutBuilder';

// Default fallback layout
const FALLBACK_LAYOUT: LayoutData = {
  mode: "ai",
  layout: ["HeroSection", "ProductGrid", "FooterSection"],
  notes: ""
};

function getTitleFromPrompt(prompt: string) {
  if (!prompt) return 'Storefront Preview';
  if (prompt.toLowerCase().includes('hero')) return 'Hero Storefront Preview';
  if (prompt.toLowerCase().includes('product')) return 'Product Storefront Preview';
  return 'Storefront Preview';
}

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt') || '';
  const [layoutData, setLayoutData] = useState<LayoutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (prompt) {
      fetchLayout(prompt);
    } else {
      setLayoutData(FALLBACK_LAYOUT);
      setLoading(false);
    }
    
    document.title = getTitleFromPrompt(prompt);
  }, [prompt]);

  const fetchLayout = async (promptText: string) => {
    try {
      const response = await fetch('/api/build-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate layout');
      }
      
      const data = await response.json();
      setLayoutData(data);
    } catch (err) {
      console.error('Error fetching layout:', err);
      setLayoutData(FALLBACK_LAYOUT);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      {layoutData && <LayoutBuilder initialLayout={layoutData} />}
    </div>
  );
} 