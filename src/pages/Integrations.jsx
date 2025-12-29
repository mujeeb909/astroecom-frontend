import { useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import IntegrationCard from '../components/features/IntegrationCard';
import {
  ShopifyIcon,
  WooCommerceIcon,
  WhatsAppIcon,
  MessengerIcon,
  InstagramIcon,
  FacebookIcon
} from '../components/ui/BrandIcons';
import { cn } from '../utils/cn';
import { selectConnections } from '../features/user/userSlice';
import { useDisconnectIntegrationMutation } from '../services/userApi';

const platformMap = {
  shopify: { name: 'Shopify', category: 'ecommerce' },
  woocommerce: { name: 'WooCommerce', category: 'ecommerce' },
  whatsapp: { name: 'WhatsApp', category: 'channel' },
  facebook: { name: 'Facebook Messenger', category: 'channel' },
  instagram: { name: 'Instagram DM', category: 'channel' },
  // Adding mappings for feed/chat variants if backend distinguishes them, 
  // otherwise assuming generic platform names
  'shopify-chat': { name: 'Shopify Chat', category: 'channel' },
  'instagram-feed': { name: 'Instagram Feed', category: 'channel' },
  'facebook-feed': { name: 'Facebook Feed', category: 'channel' },
};

const allIntegrations = [
  {
    key: 'shopify',
    name: 'Shopify',
    description: 'Manage messages and orders from your inbox with customer data and order history.',
    icon: ShopifyIcon,
    category: 'ecommerce',
  },
  {
    key: 'woocommerce',
    name: 'WooCommerce',
    description: 'Sync orders and customer data directly from your WooCommerce store into your inbox.',
    icon: WooCommerceIcon,
    category: 'ecommerce',
  },
  {
    key: 'whatsapp',
    name: 'WhatsApp',
    description: 'Engage customers on WhatsApp for higher CTAs, schedule campaigns, and push notifications.',
    icon: WhatsAppIcon,
    category: 'channel',
  },
  {
    key: 'facebook',
    name: 'Facebook Messenger',
    description: 'Quickly reply to customer messages, share products, and automate repetitive queries.',
    icon: MessengerIcon,
    category: 'channel',
  },
  {
    key: 'instagram',
    name: 'Instagram DM',
    description: 'Engage your customers by quickly responding to direct messages from your main inbox.',
    icon: InstagramIcon,
    category: 'channel',
  },
  {
    key: 'instagram-feed',
    name: 'Instagram Feed',
    description: 'Respond to your post comments and mentions directly from the main inbox to save time.',
    icon: InstagramIcon,
    category: 'channel',
  },
  {
    key: 'facebook-feed',
    name: 'Facebook Feed',
    description: 'Reply to customer comments and mentions on your Facebook posts from one simple inbox.',
    icon: FacebookIcon,
    category: 'channel',
  },
  {
    key: 'shopify-chat',
    name: 'Shopify Chat',
    description: 'Manage messages and conversations from the native chat feature on your Shopify store.',
    icon: ShopifyIcon,
    category: 'channel',
  },
];

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex justify-center mb-12">
    <div className="bg-gray-100 dark:bg-surface-dark p-1 rounded-full inline-flex">
      {['My Integrations', 'Available Integrations', 'Custom Integrations'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200",
            activeTab === tab
              ? "bg-white dark:bg-white/10 text-text-primary-light dark:text-white shadow-sm"
              : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

export const Integrations = () => {
  const [activeTab, setActiveTab] = useState('Available Integrations');
  const connections = useSelector(selectConnections);
  const [disconnectIntegration, { isLoading: isDisconnecting }] = useDisconnectIntegrationMutation();

  const handleDisconnect = async (platform, accountId) => {
    try {
      if (!accountId) return;
      await disconnectIntegration({ platform, accountId }).unwrap();
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

  // Merge static list with connection status
  const integrationsList = allIntegrations.map(integration => {
    const connectionData = connections?.[integration.key] || connections?.[integration.key.split('-')[0]]; // Handle "instagram-feed" mapping to "instagram" if needed, simplified here
    const isConnected = connectionData?.connected;

    // Assuming backend structure: { facebook: { connected: true, accounts: [{id: '...'}] } }
    // We'll take the first account ID for disconnection purpose for now
    const accountId = connectionData?.accounts?.[0]?.id;

    return {
      ...integration,
      connected: isConnected,
      accountId: accountId,
    };
  });

  const getFilteredIntegrations = () => {
    if (activeTab === 'My Integrations') {
      return integrationsList.filter(i => i.connected);
    }
    if (activeTab === 'Available Integrations') {
      // Show only platforms that are NOT connected
      return integrationsList.filter(i => !i.connected);
    }
    return [];
  };

  const visibleIntegrations = getFilteredIntegrations();
  const ecommerceIntegrations = visibleIntegrations.filter(i => i.category === 'ecommerce');
  const channelIntegrations = visibleIntegrations.filter(i => i.category === 'channel');

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-8">
          Integrations
        </h1>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {visibleIntegrations.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">

            {/* E-commerce Section */}
            {ecommerceIntegrations.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
                  E-commerce
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ecommerceIntegrations.map((integration) => (
                    <IntegrationCard
                      key={integration.key}
                      {...integration}
                      onDisconnect={() => handleDisconnect(integration.key, integration.accountId)}
                      isLoading={isDisconnecting}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Channels Section */}
            {channelIntegrations.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
                  Channels
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {channelIntegrations.map((integration) => (
                    <IntegrationCard
                      key={integration.key}
                      {...integration}
                      onDisconnect={() => handleDisconnect(integration.key, integration.accountId)}
                      isLoading={isDisconnecting}
                    />
                  ))}
                </div>
              </section>
            )}

          </div>
        ) : (
          <div className="text-center py-20 text-text-secondary-light dark:text-text-secondary-dark font-medium">
            <p className="text-lg">No {activeTab.toLowerCase()} found.</p>
            {activeTab === 'My Integrations' && (
              <p className="text-sm mt-2 opacity-70">Connect an integration from the "Available Integrations" tab to see it here.</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
