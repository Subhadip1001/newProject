import React, { useEffect, useState } from 'react';
import API from '../../api';
import Layout from '../components/Layout';
import CreateTweet from '../components/CreateTweet';
import TweetCard from '../components/TweetCard';
import { Loader2 } from 'lucide-react';

export default function Home({ user, setUser }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const { data } = await API.get('/tweets');
        setTweets(data);
      } catch (error) {
        console.error("Failed to fetch tweets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTweets();
  }, []);

  const handleTweetCreated = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };

  return (
    <Layout user={user} setUser={setUser}>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50 p-4">
        <h1 className="text-xl font-bold">Home</h1>
      </header>
      
      <CreateTweet user={user} onTweetCreated={handleTweetCreated} />
      
      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : tweets.length === 0 ? (
        <div className="p-8 text-center text-text-muted">
          No tweets yet. Be the first to post!
        </div>
      ) : (
        <div className="flex flex-col pb-20 sm:pb-0">
          {tweets.map(tweet => (
            <TweetCard key={tweet._id || Math.random()} tweet={tweet} />
          ))}
        </div>
      )}
    </Layout>
  );
}
