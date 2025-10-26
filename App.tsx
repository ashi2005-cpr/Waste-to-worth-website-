import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PostWastePage from './pages/PostWastePage';
import EducationPage from './pages/EducationPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import ChatWindow from './components/ChatWindow';
import { BotIcon } from './components/icons/BotIcon';
import { Page, WasteItem, User } from './types';
import { mockWasteItems } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [wasteItems, setWasteItems] = useState<WasteItem[]>(mockWasteItems);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('w2w_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback((user: User) => {
    localStorage.setItem('w2w_user', JSON.stringify(user));
    setCurrentUser(user);
    setCurrentPage(Page.Profile);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('w2w_user');
    setCurrentUser(null);
    setCurrentPage(Page.Home);
  }, []);

  const addWasteItem = useCallback((item: WasteItem) => {
    setWasteItems(prevItems => [item, ...prevItems]);
    setCurrentPage(Page.Search);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage setCurrentPage={setCurrentPage} login={login} />;
      case Page.Search:
        return <SearchPage wasteItems={wasteItems} />;
      case Page.PostWaste:
        return <PostWastePage onWastePosted={addWasteItem} />;
      case Page.Impact:
        return <EducationPage />;
      case Page.About:
        return <AboutPage />;
      case Page.Profile:
        if (!currentUser) {
          return <HomePage setCurrentPage={setCurrentPage} login={login} />;
        }
        return <ProfilePage user={currentUser} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} login={login}/>;
    }
  };

  return (
    <div className="bg-brand-brown-50 min-h-screen font-sans flex flex-col">
      <Header setCurrentPage={setCurrentPage} currentPage={currentPage} currentUser={currentUser} logout={logout} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
      <footer className="bg-brand-green-900 text-white text-center p-4">
        <p>&copy; 2024 Waste2Worth. All rights reserved.</p>
      </footer>
      
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-brand-green-600 hover:bg-brand-green-700 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-500"
          aria-label="Open chatbot"
        >
          <BotIcon className="w-8 h-8" />
        </button>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-3/4 max-h-[600px] z-50">
           <ChatWindow
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              title="Waste2Worth Assistant"
              systemInstruction="You are a helpful assistant for the Waste2Worth platform. Answer questions about the platform, bio-waste upcycling, and sustainability."
            />
        </div>
      )}
    </div>
  );
};

export default App;