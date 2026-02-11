import React, { useState } from 'react';
import { Menu, X, BicepsFlexed } from 'lucide-react';

export default function DayFilterSidebar({selectedDay, setSelectedDay,}) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('home');

  const DAYS = [
    { short: 'Mon', full: 'Monday', icon: BicepsFlexed},
    { short: 'Tue', full: 'Tuesday', icon: BicepsFlexed},
    { short: 'Wed', full: 'Wednesday', icon: BicepsFlexed},
    { short: 'Thu', full: 'Thursday', icon: BicepsFlexed},
    { short: 'Fri', full: 'Friday', icon: BicepsFlexed},
    { short: 'Sat', full: 'Saturday', icon: BicepsFlexed},
    { short: 'Sun', full: 'Sunday', icon: BicepsFlexed},
    { short: 'All', full: 'All Days', icon: BicepsFlexed},
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
          {DAYS.map((item) => {
            const Icon = item.icon;
            const isActive = (item.short === 'All' && selectedDay === '') || selectedDay === item.full;
            
            return (
              <button
                key={item.short}
                onClick={() => setSelectedDay(item.short === 'All' ? '' : item.full)}
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
                  {item.full}
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

  
      </div>
    </div>
  );
}