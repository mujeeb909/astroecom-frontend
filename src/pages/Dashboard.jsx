import DashboardLayout from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MessageSquare, ShoppingBag, Bot, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-h2 font-semibold text-text-primary-light dark:text-text-primary-dark mb-8">
          Dashboard Overview
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={MessageSquare}
            label="Active Conversations"
            value="24"
            trend="+12%"
            variant="primary"
          />
          <StatCard
            icon={ShoppingBag}
            label="Orders Today"
            value="18"
            trend="+8%"
            variant="success"
          />
          <StatCard
            icon={Bot}
            label="AI Responses"
            value="156"
            trend="+24%"
            variant="primary"
          />
          <StatCard
            icon={TrendingUp}
            label="Response Time"
            value="2.3m"
            trend="-15%"
            variant="success"
          />
        </div>

        {/* Recent Activity */}
        <Card header={<h2 className="text-h3 font-semibold">Recent Activity</h2>}>
          <div className="space-y-4">
            <ActivityItem
              platform="WhatsApp"
              message="New order inquiry from Sarah Johnson"
              time="2 minutes ago"
              status="urgent"
            />
            <ActivityItem
              platform="Instagram"
              message="Product question about Nike Air Max"
              time="15 minutes ago"
              status="new"
            />
            <ActivityItem
              platform="Facebook"
              message="Shipping status request"
              time="1 hour ago"
              status="resolved"
            />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, variant }) => (
  <Card className="hover:shadow-card-hover transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-body-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">
          {label}
        </p>
        <p className="text-h2 font-bold text-text-primary-light dark:text-text-primary-dark">
          {value}
        </p>
        <p className={`text-small mt-1 ${trend.startsWith('+') ? 'text-success' : 'text-error'}`}>
          {trend} from last week
        </p>
      </div>
      <div className={`p-3 rounded-lg ${variant === 'success' ? 'bg-success/10' : 'bg-primary/10'}`}>
        <Icon className={`w-6 h-6 ${variant === 'success' ? 'text-success' : 'text-primary'}`} />
      </div>
    </div>
  </Card>
);

const ActivityItem = ({ platform, message, time, status }) => (
  <div className="flex items-start gap-4 pb-4 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
      <MessageSquare className="w-5 h-5 text-primary" />
    </div>
    <div className="flex-1">
      <div className="flex items-start justify-between mb-1">
        <p className="text-body-sm font-medium text-text-primary-light dark:text-text-primary-dark">
          {message}
        </p>
        <Badge variant={status === 'urgent' ? 'error' : status === 'resolved' ? 'success' : 'primary'}>
          {status}
        </Badge>
      </div>
      <p className="text-small text-text-secondary-light dark:text-text-secondary-dark">
        {platform} • {time}
      </p>
    </div>
  </div>
);

export default Dashboard;
