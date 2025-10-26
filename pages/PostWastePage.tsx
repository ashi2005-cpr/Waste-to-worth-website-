import React, { useState, useCallback } from 'react';
import { WasteItem, UserRole } from '../types';
import { analyzeWasteImage } from '../services/geminiService';
import { Spinner } from '../components/Spinner';

interface PostWastePageProps {
  onWastePosted: (item: WasteItem) => void;
}

const PostWastePage: React.FC<PostWastePageProps> = ({ onWastePosted }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        analyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });

      const result = await analyzeWasteImage(base64Image, file.type);
      if (result) {
        // The Gemini model is prompted to return JSON
        const parsedResult = JSON.parse(result);
        if(parsedResult.type) setType(parsedResult.type);
        if(parsedResult.description) setDescription(parsedResult.description);
        if(parsedResult.title) setTitle(parsedResult.title);
      }
    } catch (e) {
      console.error(e);
      setError('Image analysis failed. Please enter details manually.');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !type || !quantity || !location || !description || !imagePreview) {
        alert('Please fill out all fields and upload an image.');
        return;
    }
    const newItem: WasteItem = {
      id: new Date().toISOString(),
      title,
      type,
      quantity,
      location,
      description,
      imageUrl: imagePreview,
      user: { name: 'Current User', role: UserRole.Provider } // Mock user
    };
    onWastePosted(newItem);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold text-brand-green-800 mb-6 text-center">Post a New Bio-Waste Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <label htmlFor="imageUpload" className="relative cursor-pointer w-full h-80 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-center group hover:border-brand-green-400 transition-colors">
               <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handleImageChange} />
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Waste preview" className={`w-full h-full object-cover rounded-lg transition-all ${isAnalyzing ? 'blur-sm brightness-75' : 'group-hover:brightness-90'}`}/>
                  {isAnalyzing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 rounded-lg">
                        <Spinner />
                        <p className="mt-2 font-semibold animate-pulse">AI is analyzing...</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-brand-brown-800 p-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="mt-2 block font-semibold">Click to upload a photo</span>
                  <p className="text-sm text-gray-500">Our AI will help fill in the details</p>
                </div>
              )}
            </label>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500" required />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Waste Type</label>
              <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g., Food Waste, Agricultural Waste" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500" required />
            </div>
             <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
              <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g., 50 kg/week, 2 tons" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500" required />
            </div>
             <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., City, State" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500" required />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500" required ></textarea>
        </div>

        <div className="text-center pt-4">
          <button type="submit" className="w-full md:w-auto bg-brand-green-600 text-white font-bold py-3 px-12 rounded-full hover:bg-brand-green-700 transition duration-300 disabled:bg-gray-400 shadow-lg hover:shadow-xl transform hover:scale-105">
            Post Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostWastePage;