
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smartphone, Landmark, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';

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

const bankTransferOptions = [
    { name: 'CBE Transfer', description: 'Direct bank transfer via CBE' },
    { name: 'Dashen Bank', description: 'Online banking transfer' },
    { name: 'Awash Bank', description: 'Secure bank-to-bank transfer' },
    { name: 'Bank of Abyssinia', description: 'BOA online transfer' },
];

const PaymentModal = ({ plan, onClose }: { plan: Plan, onClose: () => void }) => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [step, setStep] = useState<'selection' | 'processing' | 'confirmation'>('selection');
    const [selectionView, setSelectionView] = useState<'main' | 'bank_transfer'>('main');

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

    const handleMethodSelection = (methodName: string) => {
        if (methodName === 'Bank Transfer') {
            setSelectedMethod(null);
            setSelectionView('bank_transfer');
        } else {
            setSelectedMethod(methodName);
        }
    };

    const renderBankTransferSelection = () => (
        <>
            <DialogHeader>
                <div className="flex items-center gap-2 sm:gap-4 -ml-4 sm:-ml-0">
                    <Button variant="ghost" size="icon" onClick={() => { setSelectionView('main'); setSelectedMethod(null); }}>
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <div className="text-left">
                        <DialogTitle>Bank Transfers</DialogTitle>
                        <DialogDescription>
                            4 methods available
                        </DialogDescription>
                    </div>
                </div>
            </DialogHeader>
            <div className="py-4 space-y-3">
                {bankTransferOptions.map((bank) => (
                    <button
                        key={bank.name}
                        onClick={() => setSelectedMethod(bank.name)}
                        className={`w-full flex items-center justify-between p-4 border-2 rounded-lg transition-all text-left ${selectedMethod === bank.name ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
                    >
                        <div>
                            <p className="font-semibold text-card-foreground">{bank.name}</p>
                            <p className="text-sm text-muted-foreground">{bank.description}</p>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedMethod === bank.name ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                                {selectedMethod === bank.name && <div className="w-2 h-2 bg-primary-foreground rounded-full" />}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button onClick={handlePayment} disabled={!selectedMethod}>
                    Pay {plan.price} {plan.currency}
                </Button>
            </DialogFooter>
        </>
    );

    const renderMainSelection = () => (
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
                            onClick={() => handleMethodSelection(method.name)}
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
    );

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
                if (selectionView === 'bank_transfer') {
                    return renderBankTransferSelection();
                }
                return renderMainSelection();
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
