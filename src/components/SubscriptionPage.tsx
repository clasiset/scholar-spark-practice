
import React from 'react';
import BackButton from './BackButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SubscriptionPage = ({ goBack, previousPageName }: { openModal?: (type: string, data?: any) => void, goBack?: () => void, previousPageName?: string | null }) => {
  const paymentInstructions = [
    {
      title: "Payment Using Ethiopian Banks (Traditional/Branch-Based)",
      content: "The Payer approaches a branch of their chosen Ethiopian bank (e.g., Commercial Bank of Ethiopia, Awash Bank, Dashen Bank, Abyssinia Bank, Hibret Bank, etc.) with the intent to transfer a specific monetary sum to the Payee's account. The Payer will typically fill out a deposit or transfer slip, providing their account number, the Payee's full name, the Payee's account number, the Payee's bank name (if different from their own), and the exact amount to be transferred, often specifying the currency (e.g., Ethiopian Birr). They may also need to provide their identification document (e.g., National ID, Passport).\n\nUpon submission, a bank teller will verify the Payer's identity and the availability of sufficient funds in the Payer's account. The teller will then debit the specified amount from the Payer's account. Subsequently, the funds, less any applicable service charges or transaction fees, are credited to the Payee's designated account.\n\nA transaction receipt or confirmation slip detailing the transfer amount, date, time, and relevant account numbers is then issued to the Payer as proof of payment. The Payee's bank, upon receiving the electronic instruction, will update the Payee's account balance accordingly, and the Payee may receive an SMS notification or observe the updated balance via their mobile banking application or account statement."
    },
    {
      title: "Payment Using Ethiopian Mobile Banking Applications",
      content: "The Payer accesses their designated Ethiopian mobile banking application (e.g., CBE Birr, Awash Mobile, Dashen Amole, Hibret Mobile, etc.) on their smartphone or mobile device. After successfully logging in using their credentials (e.g., username/phone number and PIN/password), the Payer navigates to the 'Transfer', 'Send Money', or 'Payments' section of the application.\n\nThey will then be prompted to enter the Payee's account number or registered mobile number (if the service supports mobile-to-mobile transfers within the same bank or across integrated platforms), the amount to be transferred, and possibly a reason or description for the payment. The application may display the Payee's name for confirmation before proceeding.\n\nUpon confirming the details, the Payer authorizes the transaction, often by entering their mobile banking PIN or transaction password. The system then debits the specified amount from the Payer's linked bank account and initiates an electronic funds transfer to the Payee's account.\n\nBoth the Payer and the Payee typically receive instant SMS notifications or in-app confirmations detailing the successful completion of the transaction, including the amount transferred, transaction ID, and updated balances (if applicable). Any transaction fees are automatically deducted from the Payer's account."
    },
    {
      title: "Payment Using Ethiopian Teleco Mobile Money (e.g., Telebirr)",
      content: "The Payer accesses their Telebirr account (or similar mobile money service) via a dedicated application or USSD shortcode on their mobile phone. After authenticating their identity with their PIN, the Payer selects the option to 'Send Money' or 'Pay'.\n\nThey input the recipient's registered Telebirr mobile number, the amount they wish to send, and optionally a reference for the payment. The system then displays a summary of the transaction for review, including any applicable service charges.\n\nUpon confirmation and re-entering their PIN for authorization, the specified monetary value is debited from the Payer's Telebirr wallet. Simultaneously, the identical amount, less any fees, is credited to the Payee's Telebirr wallet.\n\nBoth the Payer and the Payee receive immediate SMS notifications confirming the successful transaction, detailing the amount transferred, the new balance of their respective wallets, and a unique transaction reference number."
    },
    {
      title: "Payment Using Other Foreign Banks (International Wire Transfer)",
      content: "The Payer, located in their respective country, initiates an international wire transfer or SWIFT transfer through their chosen foreign bank (e.g., Citibank, Standard Chartered, HSBC, JP Morgan Chase, Deutsche Bank, etc.). This can be done via their bank's online banking portal, mobile application, or by visiting a physical branch.\n\nThe Payer is required to provide comprehensive details for the transfer, including the Payee's full name, the Payee's complete bank account number, the Payee's bank's full name, the Payee's bank's SWIFT/BIC code (Society for Worldwide Interbank Financial Telecommunication / Bank Identifier Code), the Payee's bank's address, and the exact amount and currency to be sent. For transfers to Ethiopia, the currency is typically USD, EUR, or GBP, which will then be converted to Ethiopian Birr by the receiving Ethiopian bank. The Payer must also specify the purpose of the payment and often provides their own identification details.\n\nUpon submission, the foreign bank verifies the Payer's identity and fund availability. The specified amount, along with any originating bank fees and potential intermediary bank charges, is debited from the Payer's account. The foreign bank then sends a SWIFT message containing the payment instructions to the correspondent bank (if required) and ultimately to the receiving Ethiopian bank.\n\nThe receiving Ethiopian bank processes the incoming SWIFT message, verifies the details, and performs the necessary currency conversion from the foreign currency to Ethiopian Birr based on the prevailing exchange rate. Any receiving bank fees are also deducted at this stage. Finally, the converted amount is credited to the Payee's designated account in Ethiopian Birr.\n\nBoth the Payer and Payee may receive notifications from their respective banks regarding the status and completion of the transfer. The Payer typically receives a transaction confirmation from their foreign bank, while the Payee will see the funds reflected in their Ethiopian bank account statement or receive an SMS alert upon successful crediting."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {goBack && <BackButton onClick={goBack} previousPageName={previousPageName} />}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Payment Instructions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please follow the instructions below to complete your payment for a subscription plan.
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <Accordion type="single" collapsible className="w-full">
            {paymentInstructions.map((item, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 leading-relaxed whitespace-pre-line pt-2">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
