import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import DashboardLayout from '../components/layout/DashboardLayout';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Construction className="w-12 h-12 text-primary animate-pulse" />
        </div>

        <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          Work in Progress
        </h1>

        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-md mb-8">
          We're working hard to bring you this feature. Stay tuned for something amazing!
        </p>

        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default ComingSoon;
