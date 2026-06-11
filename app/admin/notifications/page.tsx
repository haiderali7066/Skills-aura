import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">
          Notifications management and configuration
        </p>
      </div>

      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Notifications features coming soon
        </p>
        <Button disabled>View Notifications</Button>
      </Card>
    </div>
  );
}
