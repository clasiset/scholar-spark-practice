
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smartphone, Landmark, Loader2, CheckCircle } from 'lucide-react';

interface Plan {
    name: string;
    price: number;
    currency: string;
    interval: string;
}

const WalletIcon = ({ name }: { name: string }) => {
    if (name === 'Telebirr') return <Smartphone className="h-8 w-8 text-green-500" />;
    if (name === 'CBE Birr') return <Smartphone className="h-8 w-8 text-purple-500" />;
    if (name === 'Amole') return <Smartphone className="h-8 w-8 text-blue-500" />;
    return <Landmark className="h-8 w-8 text-gray-500" />;
};

const paymentMethods = [
    { name: 'Telebirr', iconName: 'Telebirr' },
    { name: 'CBE Birr', iconName: 'CBE Birr' },
    { name: 'Amole', iconName: 'Amole' },
    { name: 'Bank Transfer', iconName: 'Bank' },
];

const PaymentModal = ({ plan, onClose }: { plan: Plan, onClose: () => void }) => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [step, setStep] = useState<'selection' | 'processing' | 'confirmation'>('selection');

    const handlePayment = () => {
        if (!selectedMethod) return;

        setStep('processing');
        // Simulate API call to payment gateway
        setTimeout(() => {
            setStep('confirmation');
        }, 2500);
    };

    const handleClose = () => {
        onClose();
    };

    const renderContent = () => {
        switch(step) {
            case 'processing':
            case 'confirmation':
                return (
                    <>
                        <DialogHeader>
                           <DialogTitle>Payment Initiated</DialogTitle>
                            <DialogDescription>
                               We've sent a payment request to your device via <span className="font-bold text-primary">{selectedMethod}</span>. Please check your phone to complete the transaction.
                           </DialogDescription>
                       </DialogHeader>
                       <div className="py-8 text-center">
                           <Smartphone className="h-16 w-16 text-primary mx-auto animate-pulse" />
                           <p className="mt-4 text-muted-foreground">Waiting for confirmation...</p>
                       </div>
                       <DialogFooter>
                           <Button onClick={handleClose}>Close</Button>
                       </DialogFooter>
                    </>
                );
            case 'selection':
            default:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Complete Your Subscription</DialogTitle>
                            <DialogDescription>
                                You are subscribing to the <span className="font-bold text-primary">{plan.name}</span> plan for {plan.price} {plan.currency}/{plan.interval}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <h3 className="mb-4 text-lg font-medium">Choose a Payment Method</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.name}
                                        onClick={() => setSelectedMethod(method.name)}
                                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${selectedMethod === method.name ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
                                    >
                                        <WalletIcon name={method.iconName} />
                                        <span className="mt-2 text-sm font-medium">{method.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button onClick={handlePayment} disabled={!selectedMethod}>
                                Pay {plan.price} {plan.currency}
                            </Button>
                        </DialogFooter>
                    </>
                )
        }
    }

    return (
        <Dialog open={true} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
};

export default PaymentModal;
