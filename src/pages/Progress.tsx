
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/providers/user-provider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress as ProgressIndicator } from "@/components/ui/progress";

const Progress = () => {
  const { user } = useUser();
  
  // Mock data for the mood chart - in a real app this would come from user.progress.mood
  const moodData = [
    { day: "Pzt", value: 7 },
    { day: "Sal", value: 5 },
    { day: "Çar", value: 8 },
    { day: "Per", value: 6 },
    { day: "Cum", value: 9 },
    { day: "Cmt", value: 7 },
    { day: "Paz", value: 8 },
  ];

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">İlerleme Takibi</h1>
      <p className="text-muted-foreground">Kumar davranışlarınızı kontrol altına alma yolculuğunuzda kaydettiğiniz ilerlemeleri görüntüleyin.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Kumar Yapmadan Geçen Gün</CardTitle>
            <CardDescription>Başarınızı takip edin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">{user.progress.gambleFreeDays}</div>
            <p className="text-sm text-muted-foreground">gündür kumarsız yaşıyorsunuz</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Günlük Giriş Serisi</CardTitle>
            <CardDescription>Tutarlılık motivasyon sağlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">{user.progress.streakDays}</div>
            <p className="text-sm text-muted-foreground">günlük kontrol seriniz devam ediyor</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Birikimler</CardTitle>
            <CardDescription>Kumar yerine biriktirilen miktar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">₺{user.progress.savings}</div>
            <p className="text-sm text-muted-foreground">bugüne kadar birikti</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Ruh Hali Takibi</CardTitle>
          <CardDescription>Son 7 gündeki ruh haliniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>İyileşme Yolculuğu</CardTitle>
          <CardDescription>Değerlendirme sonuçlarınıza göre ilerleme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Risk Seviyesi Azaltma</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <ProgressIndicator value={65} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Dürtü Kontrolü</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <ProgressIndicator value={40} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Tetikleyicileri Tanıma</span>
                <span className="text-sm font-medium">80%</span>
              </div>
              <ProgressIndicator value={80} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
