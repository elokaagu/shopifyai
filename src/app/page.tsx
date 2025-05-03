'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate a short loading delay
    try {
      // In a real app, you might do some validation or preprocessing here
      setTimeout(() => {
        router.push(`/builder?prompt=${encodeURIComponent(prompt)}`);
      }, 500);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const examplePrompts = [
    "A modern store with hero, products, and testimonials",
    "A storytelling layout with brand story first, then products",
    "Minimalist design with large hero image and product grid"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#09090B] to-[#1E1E24] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center border border-white/10"
      >
        <h1 className="text-3xl font-extrabold mb-2 text-white tracking-tight">AI Storefront Generator</h1>
        <p className="mb-6 text-gray-300 text-center text-sm">
          Describe your ideal store layout in natural language.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Example: A modern storefront with hero section, featured products, testimonials, and a strong call to action..."
            className="w-full min-h-[120px] p-4 rounded-lg border border-gray-700 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none shadow-sm"
            aria-label="Store layout prompt"
            disabled={loading}
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Storefront'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-sm text-gray-400">
          <p className="mb-2">Try one of these examples:</p>
          <div className="flex flex-col gap-2">
            {examplePrompts.map((examplePrompt, index) => (
              <button
                key={index}
                onClick={() => {
                  setPrompt(examplePrompt);
                  // Focus the textarea
                  const textarea = document.querySelector('textarea');
                  if (textarea) textarea.focus();
                }}
                className="text-left hover:text-indigo-300 transition-colors truncate"
              >
                • {examplePrompt}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-8 text-center text-gray-500 text-xs flex items-center gap-2"
      >
        Press <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300 text-xs font-mono">Enter ↵</kbd> to generate
      </motion.div>
    </div>
  );
}
