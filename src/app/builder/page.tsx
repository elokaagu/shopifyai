'use client';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import LayoutBuilder, { LayoutData } from '../../components/LayoutBuilder';

// Default fallback layout
const FALLBACK_LAYOUT: LayoutData = {
  mode: "ai",
  layout: ["HeroSection", "ProductGrid", "FooterSection"],
  notes: ""
};

export default function BuilderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPrompt = searchParams.get('prompt') || '';
  const [prompt, setPrompt] = useState(initialPrompt);
  const [input, setInput] = useState(initialPrompt);
  const [layoutData, setLayoutData] = useState<LayoutData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Generate layout on initial load
  useEffect(() => {
    if (initialPrompt) {
      generateLayout(initialPrompt);
    }
  }, [initialPrompt]);

  // Handle Enter key for regeneration
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleRegenerate();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const generateLayout = async (promptText: string) => {
    setLoading(true);
    setError('');
    
    try {
      // Log for debugging
      console.log('Sending prompt to API:', promptText);
      
      const response = await fetch('/api/build-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });
      
      // Check if response is OK
      if (!response.ok) {
        // Extract error text if available
        let errorText = 'Failed to generate layout';
        try {
          const errorData = await response.json();
          if (errorData.error) errorText = errorData.error;
        } catch (_) {
          // Ignore JSON parsing errors
        }
        
        console.error('API error:', response.status, errorText);
        throw new Error(errorText);
      }
      
      const data = await response.json();
      console.log('Received layout data:', data);
      
      // Validate the data structure before using it
      if (!data || !Array.isArray(data.layout) || data.layout.length === 0) {
        console.error('Invalid layout data received:', data);
        throw new Error('Invalid layout data received from API');
      }
      
      setLayoutData(data);
    } catch (err) {
      console.error('Error generating layout:', err);
      setError(`Failed to generate layout: ${err instanceof Error ? err.message : 'Unknown error'}`);
      // Still set fallback layout so the UI doesn't break
      setLayoutData(FALLBACK_LAYOUT);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setPrompt(input);
    generateLayout(input);
    // Update URL for shareability
    router.replace(`/builder?prompt=${encodeURIComponent(input)}`);
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleLayoutChange = (newLayout: LayoutData) => {
    setLayoutData(newLayout);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#09090B] to-[#1E1E24]">
      {/* Top Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-2 px-4 py-4 bg-black/60 backdrop-blur-md border-b border-[#27272A] sticky top-0 z-10">
        <button
          onClick={handleBack}
          className="text-gray-300 hover:text-white font-bold px-3 py-1 rounded transition border border-transparent hover:border-gray-600"
        >
          ← Back
        </button>
        <div className="flex-1 flex items-center gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 min-h-[40px] max-h-24 p-2 rounded bg-black/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none shadow-sm"
            aria-label="Edit prompt"
            maxLength={200}
            style={{overflow: 'hidden'}}
          />
          <button
            onClick={handleRegenerate}
            disabled={loading}
            className={`bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            aria-label="Regenerate layout"
          >
            {loading ? 'Generating...' : 'Regenerate'}
          </button>
          <a
            href={`/preview?prompt=${encodeURIComponent(input)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-lg border border-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Preview layout in new tab"
          >
            Preview ↗
          </a>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="w-full max-w-5xl mx-auto mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded">
          {error}
        </div>
      )}
      
      {/* Layout Output */}
      <main className="flex-1 w-full">
        {loading && !layoutData ? (
          <div className="w-full py-16 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-white/70">Generating your layout...</p>
          </div>
        ) : layoutData ? (
          <LayoutBuilder 
            initialLayout={layoutData} 
            onLayoutChange={handleLayoutChange}
          />
        ) : null}
      </main>
    </div>
  );
} 