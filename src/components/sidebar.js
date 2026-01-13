import React, { useState } from 'react';
import { Menu, X, BicepsFlexed } from 'lucide-react';
import Analytics from '../pages/analytics_page'

export default function ModernSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('home');

  const menuItems = [
    { id: 'home', icon: BicepsFlexed, label: 'Chest' },
    { id: 'explore', icon: BicepsFlexed, label: 'Back' },
    { id: 'trending', icon: BicepsFlexed, label: 'Shoulders' },
    { id: 'notifications', icon: BicepsFlexed, label: 'Biceps'},
    { id: 'messages', icon: BicepsFlexed, label: 'Triceps' },
    { id: 'bookmarks', icon: BicepsFlexed, label: 'Legs' },
    { id: 'profile', icon: BicepsFlexed, label: 'Other' },
  ];

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#1e2225' }}>
      {/* Sidebar */}
      <div
        className={`relative flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-20'
        }`}
        style={{ backgroundColor: '#282c30' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#3a3f44' }}>
          <div className={`flex items-center gap-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isOpen ? <X size={20} className="text-gray-400" /> : <Menu size={20} className="text-gray-400" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 relative group ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon size={22} className="flex-shrink-0" />
                <span
                  className={`transition-opacity duration-300 whitespace-nowrap ${
                    isOpen ? 'opacity-100' : 'opacity-0 w-0'
                  }`}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    className={`ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-opacity duration-300 ${
                      isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {!isOpen && item.badge && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {/*
        <div className="p-3 border-t" style={{ borderColor: '#3a3f44' }}>
          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-200"
          >
            <LogOut size={22} className="flex-shrink-0" />
            <span
              className={`transition-opacity duration-300 whitespace-nowrap ${
                isOpen ? 'opacity-100' : 'opacity-0 w-0'
              }`}
            >
              Logout
            </span>
          </button>
        </div>
        */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-white mb-4">Welcome Back!</h1>
          <p className="text-gray-400 mb-8">
            This is your main content area. The sidebar complements the background perfectly.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Analytics />
            {/*
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-6 rounded-xl border"
                style={{ backgroundColor: '#282c30', borderColor: '#3a3f44' }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">Card {i}</h3>
                <p className="text-gray-400">
                  Sample content card with complementary styling to match the sidebar design.
                </p>
              </div>
            ))}
            */}
          </div>
        </div>
      </div>
    </div>
  );
}