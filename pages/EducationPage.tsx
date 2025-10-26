import React, { useState, useRef, useEffect } from 'react';
import { getEducationalContent, getTextToSpeech } from '../services/geminiService';
import { GroundingSource } from '../types';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { SpeakerIcon } from '../components/icons/SpeakerIcon';
import { Spinner } from '../components/Spinner';

// Fix: Add audio decoding functions to handle raw PCM data from the Text-to-Speech API, as Buffer is not available in the browser.
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const EducationPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{ text: string; sources: GroundingSource[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await getEducationalContent(query);
      setResponse(result);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch educational content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = async () => {
    if (!response?.text) return;

    if (isSpeaking && audioSourceRef.current) {
        audioSourceRef.current.stop();
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        setIsSpeaking(false);
        return;
    }

    setIsSpeaking(true);
    try {
      const audioData = await getTextToSpeech(response.text);
      const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = newAudioContext;

      const audioBuffer = await decodeAudioData(
        decode(audioData),
        newAudioContext,
        24000,
        1,
      );
      const source = newAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(newAudioContext.destination);
      source.onended = () => {
        setIsSpeaking(false);
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        audioSourceRef.current = null;
      };
      source.start();
      audioSourceRef.current = source;
    } catch (error) {
        console.error("Error playing audio:", error);
        alert("Sorry, could not play the audio.");
        setIsSpeaking(false);
    }
  };
  
   useEffect(() => {
    // Cleanup audio context on component unmount
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg">
        <BookOpenIcon className="h-16 w-16 mx-auto text-brand-green-600 mb-4" />
        <h1 className="text-4xl font-bold text-brand-green-800 mb-2">Impact Hub</h1>
        <p className="text-lg text-brand-brown-800">Explore the impact of bio-waste recycling and sustainability initiatives. Our AI provides answers grounded in the latest information from Google Search.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md sticky top-24 z-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., How to make bioplastics from citrus peels?"
              className="flex-grow p-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-brand-green-500 focus:border-transparent text-lg"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-brand-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-brand-green-700 transition duration-300 disabled:bg-gray-400"
            >
              {isLoading ? 'Thinking...' : 'Ask Question'}
            </button>
          </div>
        </form>
      </div>

      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert"><p>{error}</p></div>}
      
      {isLoading && !response && (
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Spinner />
            <p className="mt-2 text-brand-brown-700">Fetching the latest information...</p>
        </div>
      )}

      {response && (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-brand-green-900">Answer</h2>
                 <button onClick={handleTextToSpeech} className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-full transition ${isSpeaking ? 'bg-red-100 text-red-800' : 'bg-brand-green-100 text-brand-green-800 hover:bg-brand-green-200'}`}>
                    <SpeakerIcon className="w-5 h-5"/>
                    <span>{isSpeaking ? 'Stop' : 'Read Aloud'}</span>
                </button>
            </div>
            <div className="p-4 bg-brand-green-50 rounded-lg">
                <div className="prose max-w-none text-brand-brown-900" dangerouslySetInnerHTML={{ __html: response.text.replace(/\n/g, '<br />') }} />
            </div>
          
          {response.sources && response.sources.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-brand-green-800 border-t pt-4">Sources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {response.sources.map((source, index) => (
                    source.web && (
                    <a href={source.web.uri} key={index} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border hover:border-brand-green-300 transition-colors">
                        <p className="font-semibold text-brand-green-700 truncate">{source.web.title}</p>
                        <p className="text-sm text-gray-500 truncate">{source.web.uri}</p>
                    </a>
                    )
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default EducationPage;