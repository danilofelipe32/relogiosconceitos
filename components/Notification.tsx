import React from 'react';

interface NotificationProps {
    message: string;
    isVisible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible }) => {
    return (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white py-2.5 px-5 rounded-lg z-50 transition-all duration-300 border border-gray-700 shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {message}
        </div>
    );
};

export default Notification;
