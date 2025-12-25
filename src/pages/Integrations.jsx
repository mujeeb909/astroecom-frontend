import DashboardLayout from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Search, Plus } from 'lucide-react';

const platforms = [
  {
    name: 'WhatsApp Business',
    description: 'Connect your WhatsApp Business account for customer messaging',
    icon: '💬',
    connected: true,
  },
  {
    name: 'Shopify',
    description: 'Sync your store products and orders with AI-powered management',
    icon: '🛍️',
    connected: true,
  },
  {
    name: 'Facebook Messenger',
    description: 'Manage Facebook page conversations in one unified inbox',
    icon: '📘',
    connected: false,
  },
  {
    name: 'Instagram',
    description: 'Handle Instagram DMs and comments seamlessly',
    icon: '📷',
    connected: false,
  },
  {
    name: 'OpenAI',
    description: 'Power your AI chatbot with GPT-4 for intelligent responses',
    icon: '🤖',
    connected: true,
  },
  {
    name: 'Groq',
    description: 'Ultra-fast AI inference for real-time chat automation',
    icon: '⚡',
    connected: false,
  },
];

export const Integrations = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-h2 font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
            Integrations
          </h1>
          <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
            Connect your platforms and tools to centralize your customer messaging
          </p>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search integrations..."
            icon={Search}
            iconPosition="left"
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <Card key={platform.name} className="hover:shadow-card-hover transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{platform.icon}</div>
                <Badge variant={platform.connected ? 'success' : 'neutral'}>
                  {platform.connected ? 'Connected' : 'Available'}
                </Badge>
              </div>
              <h3 className="text-h3 font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                {platform.name}
              </h3>
              <p className="text-body-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                {platform.description}
              </p>
              <Button
                variant={platform.connected ? 'outline' : 'primary'}
                className="w-full"
                icon={platform.connected ? undefined : Plus}
              >
                {platform.connected ? 'Manage' : 'Connect'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
