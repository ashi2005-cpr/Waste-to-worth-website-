import React, { useState, useEffect } from 'react';
import { WasteItem } from '../types';
import WasteCard from '../components/WasteCard';
import { useGeolocation } from '../hooks/useGeolocation';
import { searchWasteWithMaps } from '../services/geminiService';
import { MicrophoneIcon } from '../components/icons/MicrophoneIcon';
import { GlobeIcon } from '../components/icons/GlobeIcon';
import { RecycleIcon } from '../components/icons/RecycleIcon';

interface SearchPageProps {
  wasteItems: WasteItem[];
}

const SearchPage: React.FC<SearchPageProps> = ({ wasteItems: initialWasteItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wasteType, setWasteType] = useState('All');
  const [filteredItems, setFilteredItems] = useState<WasteItem[]>(initialWasteItems);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { location, error: geoError, getLocation } = useGeolocation();

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    let items = initialWasteItems;
    if (searchTerm) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (wasteType !== 'All') {
      items = items.filter(item => item.type === wasteType);
    }
    setFilteredItems(items);
  }, [searchTerm, wasteType, initialWasteItems]);

  const handleSearchWithGeo = async () => {
    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
        const result = await searchWasteWithMaps(searchTerm, location);
        alert(`Gemini's suggestion for "${searchTerm}" near your location:\n\n${result}`);
    } catch (e) {
        setError('Failed to search with Gemini. Please try again.');
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      setSearchTerm("Transcription placeholder: 'coffee grounds'");
      alert("Audio recording stopped. In a real app, this would be transcribed.");
    } else {
      setIsRecording(true);
      alert("Recording started. Click the mic again to stop. Requires microphone permissions.");
    }
  };


  const wasteTypes = ['All', ...Array.from(new Set(initialWasteItems.map(item => item.type)))];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-brand-green-800 mb-2">Find Bio-Waste Resources</h1>
        <p className="text-brand-brown-700 mb-6">Search our listings or use Gemini to find resources near you.</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for waste (e.g., 'coffee grounds', 'wood chips')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-5 pr-12 text-lg border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-brand-green-500 focus:border-transparent"
            />
            <button onClick={handleMicClick} className={`absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-brand-green-600 ${isRecording ? 'text-red-500' : ''}`}>
              <MicrophoneIcon className="w-6 h-6" />
            </button>
          </div>
          <button
              onClick={handleSearchWithGeo}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full md:w-auto bg-brand-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-brand-green-700 transition duration-300 disabled:bg-gray-400 shadow-sm"
          >
              <GlobeIcon className="w-5 h-5" />
              <span>{isLoading ? 'Searching...' : 'Search with Geo'}</span>
          </button>
        </div>
         {geoError && <p className="text-red-500 text-sm mt-2 text-center md:text-left">{geoError}</p>}
         {error && <p className="text-red-500 text-sm mt-2 text-center md:text-left">{error}</p>}

        <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Filter by type:</h3>
            <div className="flex flex-wrap gap-2">
                {wasteTypes.map(type => (
                    <button 
                        key={type} 
                        onClick={() => setWasteType(type)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                            wasteType === type 
                            ? 'bg-brand-green-600 text-white shadow' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-brand-green-900 mb-4 px-2">Available Listings ({filteredItems.length})</h2>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <WasteCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <RecycleIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl font-semibold text-brand-brown-800">No Listings Found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;