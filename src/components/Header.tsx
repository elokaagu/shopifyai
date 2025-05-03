'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  // Skip header on the landing page
  if (pathname === '/') {
    return null;
  }

  return (
    <header className="bg-black text-white border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <span className="bg-white text-black px-2 py-1 rounded text-sm">AI</span>
          Storefront Generator
        </Link>
        
        <nav className="flex gap-6 items-center">
          <Link 
            href="/builder" 
            className={`hover:text-blue-400 transition-colors ${
              pathname.includes('/builder') ? 'text-blue-400' : ''
            }`}
          >
            Builder
          </Link>
          <Link 
            href="/store" 
            className={`hover:text-blue-400 transition-colors ${
              pathname.includes('/store') || pathname.includes('/products') ? 'text-blue-400' : ''
            }`}
          >
            Store Demo
          </Link>
          <Link 
            href="https://github.com/yourusername/nextjs-app" 
            target="_blank"
            className="hover:text-blue-400 transition-colors"
          >
            Docs
          </Link>
          <Link 
            href="/cart" 
            className="relative"
          >
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
              0
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
} 