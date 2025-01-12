import React, { useState } from 'react';
import { X } from 'lucide-react';
import { sendXionPayment } from '../lib/xion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientAddress: string;
  amount: string;
  projectTitle: string;
}

export function PaymentModal({ isOpen, onClose, recipientAddress, amount, projectTitle }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      await sendXionPayment(
        recipientAddress,
        amount,
        `Payment for project: ${projectTitle}`
      );
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Confirm Payment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">Amount</div>
            <div className="text-2xl font-bold">{amount} XION</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">Recipient</div>
            <div className="text-sm font-mono break-all">{recipientAddress}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">Project</div>
            <div className="font-medium">{projectTitle}</div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full btn btn-primary"
          >
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}