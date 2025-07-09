import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    onAction?: () => void;
    actionText?: string;
}

const SuccessModal = ({
    isOpen,
    onClose,
    title = 'Đăng ký thành công!',
    message = 'Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập ngay bây giờ.',
    onAction,
    actionText = 'Đăng nhập ngay'
}: SuccessModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="text-center">
                    {/* Success Icon */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {title}
                    </h2>

                    {/* Message */}
                    <p className="text-gray-600 mb-6">
                        {message}
                    </p>

                    {/* Action Button */}
                    {onAction && (
                        <button
                            onClick={onAction}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            {actionText}
                        </button>
                    )}

                    {/* Close Button */}
                    {!onAction && (
                        <button
                            onClick={onClose}
                            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                        >
                            Đóng
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuccessModal; 