import React, { useState } from 'react';

const Chat = ({ onCloseChat }) => {
  // Sample conversation data, replace it with your actual chat data
  const [chatMessages, setChatMessages] = useState([
    { sender: 'seller', message: 'Hello and thank you for your interest in the property.' },
    { sender: 'buyer', message: "Hi, I'd like to get more information about the property." },
    // Add more messages as needed
  ]);

  const handleSendMessage = (message) => {
    // Implement logic to send messages
    // For simplicity, let's just update the state with a new message
    setChatMessages([...chatMessages, { sender: 'buyer', message }]);
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="card" id="chat1" style={{ borderRadius: '15px' }}>
              <div
                className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
              >
                <i className="fas fa-angle-left" onClick={onCloseChat}></i>
                <p className="mb-0 fw-bold">Live chat</p>
                <i className="fas fa-times" onClick={onCloseChat}></i>
              </div>
              <div className="card-body">
                {/* Chat messages */}
                {chatMessages.map((chat, index) => (
                  <div key={index} className={`d-flex flex-row justify-content-${chat.sender === 'seller' ? 'start' : 'end'} mb-4`}>
                    <img
                      src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${chat.sender === 'seller' ? '1' : '2'}-bg.webp`}
                      alt={`avatar ${chat.sender === 'seller' ? '1' : '2'}`}
                      style={{ width: '45px', height: '100%' }}
                    />
                    <div className={`p-3 ${chat.sender === 'seller' ? 'ms-3' : 'me-3'} border`} style={{ borderRadius: '15px', backgroundColor: chat.sender === 'seller' ? 'rgba(57, 192, 237, 0.2)' : '#fbfbfb' }}>
                      <p className="small mb-0">{chat.message}</p>
                    </div>
                  </div>
                ))}

                {/* Textarea for typing messages */}
                <div className="form-outline">
                  <textarea className="form-control" id="textAreaExample" rows="4" onChange={(e) => handleSendMessage(e.target.value)}></textarea>
                  <label className="form-label" htmlFor="textAreaExample">
                    Type your message
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
