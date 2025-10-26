import React, { useState } from 'react';
import { Page, User } from '../types';
import { Waste2WorthLogo } from './icons/Waste2WorthLogo';

interface HeaderProps {
  setCurrentPage: (page: Page) => void;
  currentPage: Page;
  currentUser: User | null;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage, currentPage, currentUser, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems: Page[] = [Page.Home, Page.PostWaste, Page.Search, Page.Impact, Page.About];

  const NavLink: React.FC<{ page: Page; isMobile?: boolean }> = ({ page, isMobile }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setIsMenuOpen(false);
      }}
      className={`font-medium transition-colors duration-300 ${isMobile ? 'block w-full text-left px-3 py-2 rounded-md text-base' : 'px-3 py-2 text-sm rounded-md'} ${
        currentPage === page
          ? 'text-brand-green-700'
          : 'text-brand-green-900 hover:text-brand-green-700'
      }`}
    >
      {page}
    </button>
  );

  const handleLoginClick = () => {
    setCurrentPage(Page.Home);
    setTimeout(() => {
        document.getElementById('register-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-brand-brown-50/80 backdrop-blur-sm shadow-sm sticky top-0 z-30">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <button onClick={() => setCurrentPage(Page.Home)} className="flex items-center space-x-2 text-brand-green-900 group">
                <Waste2WorthLogo className="h-10 w-10" />
                <span className="text-2xl font-bold">Waste2Worth</span>
              </button>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {navItems.map((item) => <NavLink key={item} page={item} />)}
                 {currentUser ? (
                   <>
                    <button
                      onClick={() => setCurrentPage(Page.Profile)}
                      className="ml-4 px-5 py-2 text-sm font-medium text-white bg-brand-green-600 rounded-md hover:bg-brand-green-700 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logout}
                      className="ml-2 px-5 py-2 text-sm font-medium text-brand-green-700 bg-transparent border border-brand-green-600 rounded-md hover:bg-brand-green-100 transition-colors"
                    >
                      Logout
                    </button>
                   </>
                 ) : (
                    <button 
                    onClick={handleLoginClick}
                    className="ml-4 px-5 py-2 text-sm font-medium text-brand-green-700 bg-transparent border border-brand-green-600 rounded-md hover:bg-brand-green-600 hover:text-white transition-colors"
                    >
                    Login
                    </button>
                 )}
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-brand-green-800 hover:text-brand-green-700 hover:bg-brand-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-green-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => <NavLink key={item} page={item} isMobile />)}
               {currentUser ? (
                   <>
                    <button
                      onClick={() => { setCurrentPage(Page.Profile); setIsMenuOpen(false); }}
                      className="mt-2 block w-full text-left px-4 py-2 rounded-md text-base font-medium text-white bg-brand-green-600 hover:bg-brand-green-700 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logout}
                      className="mt-2 block w-full text-left px-4 py-2 rounded-md text-base font-medium text-brand-green-700 bg-transparent border border-brand-green-600 hover:bg-brand-green-100 transition-colors"
                    >
                      Logout
                    </button>
                   </>
                 ) : (
                    <button 
                        onClick={handleLoginClick}
                        className="mt-2 block w-full text-left px-4 py-2 rounded-md text-base font-medium text-brand-green-700 bg-transparent border border-brand-green-600 hover:bg-brand-green-600 hover:text-white transition-colors"
                    >
                        Login
                    </button>
                 )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;