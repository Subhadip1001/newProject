import React from 'react';
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

export default function TweetCard({ tweet }) {
  const timeAgo = formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true });

  const shortTime = timeAgo.replace('about ', '').replace(' hours', 'h').replace(' minutes', 'm').replace(' ago', '');

  return (
    <div className="flex gap-4 p-4 border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer">
      <div className="flex-shrink-0">
        <Link to={`/profile/${tweet.user?._id}`}>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold hover:opacity-80 transition-opacity">
            {tweet.user?.userName?.charAt(0).toUpperCase() || '?'}
          </div>
        </Link>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 overflow-hidden">
            <Link to={`/profile/${tweet.user?._id}`} className="font-bold hover:underline truncate">
              {tweet.user?.userName || 'Unknown'}
            </Link>
            <span className="text-text-muted truncate">
              @{tweet.user?.userName?.toLowerCase() || 'unknown'}
            </span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted flex-shrink-0 hover:underline">{shortTime}</span>
          </div>
          <button className="text-text-muted hover:text-primary hover:bg-primary/10 p-2 rounded-full transition-colors -mr-2 -mt-2">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-1 text-[15px] whitespace-pre-wrap break-words leading-normal">
          {tweet.content}
        </div>
        
        <div className="flex justify-between mt-3 text-text-muted max-w-md">
          <button className="flex items-center gap-2 group hover:text-blue-500 transition-colors">
            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-xs">0</span>
          </button>
          <button className="flex items-center gap-2 group hover:text-green-500 transition-colors">
            <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
              <Repeat2 className="w-4 h-4" />
            </div>
            <span className="text-xs">0</span>
          </button>
          <button className="flex items-center gap-2 group hover:text-pink-600 transition-colors">
            <div className="p-2 rounded-full group-hover:bg-pink-600/10 transition-colors">
              <Heart className="w-4 h-4" />
            </div>
            <span className="text-xs">0</span>
          </button>
          <button className="flex items-center gap-2 group hover:text-blue-500 transition-colors">
            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
              <Share className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
