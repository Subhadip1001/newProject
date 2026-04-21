import React, { useState } from 'react';
import API from '../../api.js';

const Login = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ userName: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const endpoint = isLogin ? '/users/login' : '/users/signup';
            const { data } = await API.post(endpoint, formData);
            
            // Save user data and token to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('profile', JSON.stringify(data.user));
            
            // Update parent state to log user in
            setUser(data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-text">
            <div className="w-full max-w-md p-8 bg-surface border border-border/50 rounded-2xl shadow-xl">
                <div className="flex justify-center mb-6">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-10 h-10 fill-current text-white"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.936H5.023z"></path></g></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-center mb-6">
                    {isLogin ? 'Sign in to X' : 'Join X today'}
                </h2>

                {error && (
                    <div className="p-3 mb-4 text-sm text-white bg-red-500/80 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-transparent border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                            placeholder="Username"
                            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 bg-transparent border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                            placeholder="Password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 font-bold text-background bg-white rounded-full hover:bg-gray-200 transition-colors"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-primary hover:underline"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;