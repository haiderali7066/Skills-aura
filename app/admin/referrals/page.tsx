import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ReferralProgramPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
        <p className="text-muted-foreground">
          Referral Program management and configuration
        </p>
      </div>

      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Referral Program features coming soon
        </p>
        <Button disabled>View Referral Program</Button>
      </Card>
    </div>
  );
}
