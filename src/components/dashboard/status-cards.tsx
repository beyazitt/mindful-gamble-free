
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, TrendingUp, AlertTriangle } from "lucide-react";
import { useUser } from "@/providers/user-provider";

export const StatusCards = () => {
  const { user } = useUser();

  const getRiskLevelColor = () => {
    switch (user.assessment.riskLevel) {
      case 'low':
        return 'text-green-500 bg-green-100';
      case 'moderate':
        return 'text-amber-500 bg-amber-100';
      case 'high':
        return 'text-red-500 bg-red-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const getRiskLevelText = () => {
    switch (user.assessment.riskLevel) {
      case 'low':
        return 'Düşük';
      case 'moderate':
        return 'Orta';
      case 'high':
        return 'Yüksek';
      default:
        return 'Belirsiz';
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Kumar Oynamadığınız Gün</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.progress.gambleFreeDays} gün</div>
          <p className="text-xs text-muted-foreground">
            {user.progress.gambleFreeDays === 0 
              ? "Henüz başlıyorsunuz, adım adım ilerleyin" 
              : "Her gün bir başarı"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Güncel Seri</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.progress.streakDays} gün</div>
          <p className="text-xs text-muted-foreground">
            {user.progress.streakDays === 0 
              ? "Yeni bir başlangıç zamanı" 
              : "Harika gidiyorsunuz!"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Risk Seviyesi</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold capitalize ${getRiskLevelColor()} px-3 py-1 rounded-full inline-block`}>
            {getRiskLevelText()}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Değerlendirme sonucunuza göre
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
