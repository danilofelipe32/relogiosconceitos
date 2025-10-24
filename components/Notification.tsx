
import React from 'react';

interface NotificationProps {
    message: string;
    isVisible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible }) => {
    return (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-lg z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {message}
        </div>
    );
};

export default Notification;
