import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function WhatsAppIntegrationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">WhatsApp Integration</h1>
        <p className="text-muted-foreground">
          WhatsApp Integration management and configuration
        </p>
      </div>

      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          WhatsApp Integration features coming soon
        </p>
        <Button disabled>View WhatsApp Integration</Button>
      </Card>
    </div>
  );
}
