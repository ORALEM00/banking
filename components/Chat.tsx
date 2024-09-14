"use client";
import { useChat } from 'ai/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/openai',
  });

  const chatContainer = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    const chatDiv = chatContainer.current;
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    if (input.trim()) {
      handleSubmit(); // Call handleSubmit directly
    }
  };

  // Renders the chat messages
  const renderMessages = () => {
    if (messages.length === 0) return null;

    return messages.map((m, index) => {
      // Filter messages to show only user and assistant roles
      if (index === 0 || (m.role !== 'user' && m.role !== 'assistant')) {
        return null;
      }

      console.log('Rendering messages:', messages); // Debugging

      return (
        <div
          key={index}
          className={`chat-line ${m.role === 'user' ? 'user-chat' : 'ai-chat'}`}
        >

          <div style={{ marginLeft: '16px', width: '100%' }}>
            <p className="message">{m.content}</p>
            {index < messages.length - 1 && <div className="horizontal-line" />}
          </div>
        </div>
      );
    });
  };

  return (
    <div ref={chatContainer} className="chat">
      {renderMessages()}
      <form onSubmit={handleFormSubmit} className="mainform">
        <input
          name="input-field"
          type="text"
          placeholder="Ask anything about the site"
          onChange={handleInputChange}
          value={input}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;