import React, { useState } from 'react';

const UserVoice = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
        }
    };
    
    return (
        <div className="flex flex-col h-screen max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
            <div className="flex-1 overflow-y-auto mb-4 bg-white p-6 rounded-lg shadow-lg space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-xl max-w-xs ${
                            index % 2 === 0
                                ? 'bg-blue-500 text-white self-end rounded-br-none'
                                : 'bg-gray-200 text-gray-800 self-start rounded-bl-none'
                        } shadow-md`}
                    >
                        {message}
                    </div>
                ))}
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <input
                    type="text"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    className="ml-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
                    onClick={sendMessage}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default UserVoice;
