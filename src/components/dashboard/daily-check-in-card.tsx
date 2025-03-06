
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useUser } from "@/providers/user-provider";

interface DailyCheckInCardProps {
  onCheckInClick: () => void;
}

export const DailyCheckInCard = ({ onCheckInClick }: DailyCheckInCardProps) => {
  const { user } = useUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <span>Günlük Giriş</span>
        </CardTitle>
        <CardDescription>
          Günlük giriş yaparak ilerlemenizi takip edin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              {user.progress.lastCheckIn 
                ? "Son giriş: " + new Date(user.progress.lastCheckIn).toLocaleDateString('tr-TR') 
                : "Henüz giriş yapmadınız"}
            </p>
            <p className="text-sm text-muted-foreground">
              Günlük giriş yaparak motivasyonunuzu koruyun
            </p>
          </div>
          <Button 
            onClick={onCheckInClick}
            disabled={
              user.progress.lastCheckIn && new Date(user.progress.lastCheckIn).toDateString() === new Date().toDateString()
            }
          >
            {user.progress.lastCheckIn && new Date(user.progress.lastCheckIn).toDateString() === new Date().toDateString()
              ? "Giriş Yapıldı"
              : "Giriş Yap"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
