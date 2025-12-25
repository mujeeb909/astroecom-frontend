import DashboardLayout from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Inbox = () => {
  return (
    <DashboardLayout>
      <div className="flex h-screen">
        {/* Conversation List */}
        <div className="w-80 border-r border-border-light dark:border-border-dark flex flex-col">
          <div className="p-4 border-b border-border-light dark:border-border-dark">
            <Input
              placeholder="Search conversations..."
              icon={Search}
              iconPosition="left"
            />
            <div className="flex gap-2 mt-4">
              <FilterTab label="All" active />
              <FilterTab label="Unread" />
              <FilterTab label="Resolved" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ConversationItem
              name="Sarah Johnson"
              message="Thanks for the quick response!"
              time="2m"
              unread={2}
              platform="whatsapp"
              urgent
            />
            <ConversationItem
              name="Mike Chen"
              message="When will my order arrive?"
              time="15m"
              platform="instagram"
            />
            <ConversationItem
              name="Emma Davis"
              message="I love the new collection!"
              time="1h"
              platform="facebook"
            />
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border-light dark:border-border-dark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                SJ
              </div>
              <div>
                <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                  Sarah Johnson
                </h3>
                <p className="text-small text-text-secondary-light dark:text-text-secondary-dark">
                  WhatsApp • Online
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-surface-light-alt dark:hover:bg-surface-dark rounded-lg">
              <MoreVertical className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <MessageBubble
              text="Hi! I'm interested in the Nike Air Max. Do you have size 8 in stock?"
              time="10:30 AM"
              received
            />
            <MessageBubble
              text="Hello! Yes, we have size 8 available in both black and white. Would you like to place an order?"
              time="10:32 AM"
              sent
            />
            <MessageBubble
              text="Great! I'll take the black ones. Can you ship to New York?"
              time="10:33 AM"
              received
            />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border-light dark:border-border-dark">
            <div className="flex items-end gap-2">
              <button className="p-2 hover:bg-surface-light-alt dark:hover:bg-surface-dark rounded-lg">
                <Paperclip className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
              </button>
              <Input
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button icon={Send}>Send</Button>
            </div>
          </div>
        </div>

        {/* Context Panel */}
        <div className="w-80 border-l border-border-light dark:border-border-dark p-6 overflow-y-auto">
          <h3 className="text-h3 font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
            Order Details
          </h3>
          <Card>
            <div className="space-y-3">
              <div>
                <p className="text-small text-text-secondary-light dark:text-text-secondary-dark">Product</p>
                <p className="font-medium text-text-primary-light dark:text-text-primary-dark">Nike Air Max</p>
              </div>
              <div>
                <p className="text-small text-text-secondary-light dark:text-text-secondary-dark">Stock Status</p>
                <Badge variant="success">In Stock</Badge>
              </div>
              <div>
                <p className="text-small text-text-secondary-light dark:text-text-secondary-dark">Price</p>
                <p className="font-medium text-text-primary-light dark:text-text-primary-dark">$129.99</p>
              </div>
            </div>
          </Card>

          <div className="mt-6">
            <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
              AI Automation
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-body-sm">AI bot handling</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-body-sm">Professional tone</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const FilterTab = ({ label, active }) => (
  <button
    className={`px-3 py-1.5 rounded-button text-body-sm font-medium transition-colors ${active
        ? 'bg-primary text-white'
        : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-light-alt dark:hover:bg-surface-dark'
      }`}
  >
    {label}
  </button>
);

const ConversationItem = ({ name, message, time, unread, platform, urgent }) => (
  <div className="p-4 border-b border-border-light dark:border-border-dark hover:bg-surface-light-alt dark:hover:bg-surface-dark cursor-pointer">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold flex-shrink-0">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
            {name}
          </h4>
          <span className="text-small text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0">
            {time}
          </span>
        </div>
        <p className="text-body-sm text-text-secondary-light dark:text-text-secondary-dark truncate">
          {message}
        </p>
        <div className="flex items-center gap-2 mt-2">
          {urgent && <Badge variant="error">Urgent</Badge>}
          {unread && (
            <span className="px-2 py-0.5 rounded-full bg-primary text-white text-small">
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const MessageBubble = ({ text, time, sent, received }) => (
  <div className={`flex ${sent ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-md ${sent ? 'order-2' : 'order-1'}`}>
      <div
        className={`px-4 py-2 rounded-bubble ${sent
            ? 'bg-primary text-white rounded-br-sm'
            : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-bl-sm'
          }`}
      >
        <p className={`text-body-sm ${sent ? 'text-white' : 'text-text-primary-light dark:text-text-primary-dark'}`}>
          {text}
        </p>
      </div>
      <p className={`text-small text-text-secondary-light dark:text-text-secondary-dark mt-1 ${sent ? 'text-right' : 'text-left'}`}>
        {time}
      </p>
    </div>
  </div>
);

export default Inbox;
