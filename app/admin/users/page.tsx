import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">
          User Management management and configuration
        </p>
      </div>

      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          User Management features coming soon
        </p>
        <Button disabled>View User Management</Button>
      </Card>
    </div>
  );
}
