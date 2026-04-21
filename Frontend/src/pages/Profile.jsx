import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import Layout from '../components/Layout';
import TweetCard from '../components/TweetCard';
import { ArrowLeft, Calendar, Loader2 } from 'lucide-react';

export default function Profile({ user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isOwnProfile = user && user._id === id;

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const [userRes, tweetsRes] = await Promise.all([
          API.get(`/users/${id}`),
          API.get(`/tweets/user/${id}`)
        ]);
        setProfileUser(userRes.data);
        setTweets(tweetsRes.data);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout user={user} setUser={setUser}>
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !profileUser) {
    return (
      <Layout user={user} setUser={setUser}>
        <div className="p-8 text-center text-text-muted">{error || 'User not found'}</div>
      </Layout>
    );
  }

  return (
    <Layout user={user} setUser={setUser}>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50 p-2 flex items-center gap-6">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-full hover:bg-surface transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold">{profileUser.userName}</h1>
          <span className="text-sm text-text-muted">{tweets.length} posts</span>
        </div>
      </header>

      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-surface border-b border-border/50"></div>
        <div className="absolute top-20 left-4">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-3xl text-white font-bold border-4 border-background">
            {profileUser.userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="pt-14 px-4 pb-4 border-b border-border/50">
        <div className="flex justify-end mb-2">
          {isOwnProfile ? (
            <button className="rounded-full border border-border font-bold py-1.5 px-4 hover:bg-surface transition-colors">
              Edit profile
            </button>
          ) : (
            <button className="rounded-full bg-white text-black font-bold py-1.5 px-4 hover:bg-gray-200 transition-colors">
              Follow
            </button>
          )}
        </div>
        
        <h2 className="text-xl font-extrabold">{profileUser.userName}</h2>
        <span className="text-text-muted">@{profileUser.userName.toLowerCase()}</span>
        
        {profileUser.bio && (
          <p className="mt-3 text-[15px]">{profileUser.bio}</p>
        )}
        
        <div className="flex items-center gap-1 mt-3 text-text-muted">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Joined recently</span>
        </div>
        
        <div className="flex gap-4 mt-3">
          <div className="flex gap-1 hover:underline cursor-pointer">
            <span className="font-bold text-text">0</span>
            <span className="text-text-muted">Following</span>
          </div>
          <div className="flex gap-1 hover:underline cursor-pointer">
            <span className="font-bold text-text">0</span>
            <span className="text-text-muted">Followers</span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-border/50 w-full overflow-x-auto no-scrollbar">
        <div className="flex-1 text-center font-bold relative py-4 hover:bg-surface transition-colors cursor-pointer text-text">
          Posts
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></div>
        </div>
        <div className="flex-1 text-center font-medium relative py-4 hover:bg-surface transition-colors cursor-pointer text-text-muted">
          Replies
        </div>
        <div className="flex-1 text-center font-medium relative py-4 hover:bg-surface transition-colors cursor-pointer text-text-muted">
          Highlights
        </div>
        <div className="flex-1 text-center font-medium relative py-4 hover:bg-surface transition-colors cursor-pointer text-text-muted">
          Media
        </div>
      </div>

      <div className="flex flex-col pb-20 sm:pb-0">
        {tweets.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            @{profileUser.userName} hasn't posted any tweets yet.
          </div>
        ) : (
          tweets.map(tweet => (
            <TweetCard key={tweet._id} tweet={{...tweet, user: profileUser}} />
          ))
        )}
      </div>
    </Layout>
  );
}
