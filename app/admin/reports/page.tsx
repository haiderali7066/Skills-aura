import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ReportsAndAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Reports & Analytics management and configuration
        </p>
      </div>

      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Reports & Analytics features coming soon
        </p>
        <Button disabled>View Reports & Analytics</Button>
      </Card>
    </div>
  );
}
