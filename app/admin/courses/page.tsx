import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CourseManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Course Management</h1>
        <p className="text-muted-foreground">
          Course Management management and configuration
        </p>
      </div>

      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Course Management features coming soon
        </p>
        <Button disabled>View Course Management</Button>
      </Card>
    </div>
  );
}
