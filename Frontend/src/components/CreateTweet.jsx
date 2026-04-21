import React, { useState } from 'react';
import { Image, Film, ListTodo, Smile, Calendar, MapPin } from 'lucide-react';
import API from '../../api';

export default function CreateTweet({ user, onTweetCreated }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const { data } = await API.post('/tweets', { content });
      setContent('');
      onTweetCreated({ ...data, user: user });
    } catch (error) {
      console.error("Failed to post tweet", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 p-4 border-b border-border/50">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold cursor-pointer">
          {user?.userName?.charAt(0).toUpperCase() || '?'}
        </div>
      </div>
      
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What is happening?!"
          className="w-full bg-transparent text-xl outline-none resize-none min-h-[50px] overflow-hidden text-text placeholder-text-muted mt-2"
          onChangeCapture={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
        
        <div className="border-t border-border/50 mt-3 pt-3 flex justify-between items-center">
          <div className="flex gap-1 text-primary">
            <button className="p-2 rounded-full hover:bg-primary/10 transition-colors tooltip-trigger relative">
              <Image className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-primary/10 transition-colors hidden sm:block">
              <Film className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-primary/10 transition-colors hidden sm:block">
              <ListTodo className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-primary/10 transition-colors hidden md:block">
              <Calendar className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-primary/10 transition-colors hidden md:block opacity-50 cursor-not-allowed">
              <MapPin className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || loading}
            className="px-4 py-1.5 bg-primary text-white font-bold rounded-full hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
