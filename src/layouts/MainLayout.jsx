import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/navigation/NavigationSidebar';
import RightSidebar from '../components/navigation/RightSidebar';
import MobileMenu from '../components/navigation/MobileMenu';

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Left Sidebar - Desktop */}
      <div className="hidden lg:block w-64 border-r border-zinc-900 h-screen sticky top-0">
        <NavigationSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-900">
          <h1 className="text-2xl font-black text-white">GLOVES OFF</h1>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Right Sidebar - Desktop */}
      <div className="hidden xl:block w-80 border-l border-zinc-900 h-screen sticky top-0">
        <RightSidebar />
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </div>
  );
};

export default MainLayout;