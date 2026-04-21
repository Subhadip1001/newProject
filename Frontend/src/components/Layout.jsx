import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, user, setUser }) {
  return (
    <div className="flex justify-center min-h-screen bg-background w-full max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <Sidebar user={user} setUser={setUser} />
      
      {/* Main Content Area */}
      <main className="w-full sm:w-[600px] border-r border-border/50 min-h-screen pb-20 sm:pb-0">
        {children}
      </main>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-[350px] p-4">
        <div className="sticky top-4">
          <div className="bg-surface rounded-full flex items-center px-4 py-2 border border-transparent focus-within:border-primary focus-within:bg-background transition-colors mb-4">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 text-text-muted fill-current relative top-[1px]">
              <g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g>
            </svg>
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-none outline-none text-text w-full ml-3"
            />
          </div>

          <div className="bg-surface rounded-2xl border border-border/50 py-3 mt-4">
            <h2 className="text-xl font-extrabold px-4 mb-3">Who to follow</h2>
            <div className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-slate-700"></div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm hover:underline">Someone</span>
                  <span className="text-text-muted text-sm">@someone</span>
                </div>
              </div>
              <button className="bg-white text-black font-bold py-1.5 px-4 rounded-full text-sm hover:bg-gray-200 transition-colors">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
