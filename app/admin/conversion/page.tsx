import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ConversionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Conversion Metrics</h1>
        <p className="text-muted-foreground">
          Track and analyze visitor to customer conversion rates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-1">Visitor Count</div>
          <div className="text-3xl font-bold">0</div>
          <div className="text-xs text-muted-foreground mt-2">This month</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-1">Conversions</div>
          <div className="text-3xl font-bold">0</div>
          <div className="text-xs text-muted-foreground mt-2">This month</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-1">Conversion Rate</div>
          <div className="text-3xl font-bold">0%</div>
          <div className="text-xs text-muted-foreground mt-2">This month</div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Conversion Pipeline</h2>
        <p className="text-muted-foreground mb-4">
          Detailed conversion analytics coming soon
        </p>
        <Button disabled>View Detailed Analytics</Button>
      </Card>
    </div>
  );
}
