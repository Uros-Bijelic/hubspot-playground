'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuthContext } from '@/context/auth-context';
import { useGetContacts } from '@/lib/hooks/queries/use-get-contacts';

const Home = () => {
  const { isLoading } = useGetContacts();
  const { owner } = useAuthContext();

  const ownerFullName = `${owner?.firstName} ${owner?.lastName}`;

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <div className="w-full border border-red-500">
      <h2 className="d2-bold">Welcome {ownerFullName}</h2>
      <div className=""></div>
    </div>
  );
};

export default Home;

// TODO: These are the features i have to implement
// Here's more detailed information on how to implement the key customer service features in HubSpot for your Next.js app:

// 1. Ticketing System
// Creating a Ticket: In your HubSpot account, go to CRM > Tickets and click Create ticket. Fill in the required fields like Ticket name, Pipeline, and Ticket status. You can also associate the ticket with specific contacts or companies.
// For more details, check out this guide on creating tickets  .
// 2. Knowledge Base
// Creating a Knowledge Base: Navigate to Content > Knowledge Base in your HubSpot account. You can create a new knowledge base by clicking "Create a new knowledge base." Fill in the details such as the title, language, and domain where it will be hosted.
// For step-by-step instructions, refer to this knowledge base creation guide  .
// 3. Live Chat
// Setting Up Live Chat: Go to Automations > Chatflows in your HubSpot account. Click Create chat flow, select Website and choose the inbox to connect. Follow the prompts to customize your chat widget and create workflow settings.
// To learn more about this process, visit this live chat setup guide  .
// These features will provide your customers with effective support options directly through your application. Do you need more help with a specific feature or implementation?

// Yes, the AI features can enhance the customer service functionalities you were interested in:

// AI-Powered Chatbots can be integrated within the Live Chat feature, allowing the chatbots to respond to customer inquiries instantly, reducing response times and improving customer satisfaction.

// AI Data Enrichment can supplement the Ticketing System by automatically providing additional context or insights about customers, helping your support team resolve tickets more efficiently.

// Would you like to explore how to implement these AI features further?
