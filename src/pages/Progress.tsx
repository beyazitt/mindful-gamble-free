
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/providers/user-provider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress as ProgressIndicator } from "@/components/ui/progress";
import { Dices } from "lucide-react";

const Progress = () => {
  const { user } = useUser();
  
  // Kullanıcının ruh hali verilerini oluşturalım (dinamik veriler için)
  const moodData = [
    { day: "Pzt", value: 5 }, // Kötü başlangıç
    { day: "Sal", value: 4 }, // Biraz daha düşüş
    { day: "Çar", value: 6 }, // Hafif iyileşme
    { day: "Per", value: 7 }, // İyileşme devam ediyor
    { day: "Cum", value: 6 }, // Hafta sonu öncesi hafif düşüş
    { day: "Cmt", value: 8 }, // Hafta sonu geldiği için yükseliş
    { day: "Paz", value: 7 }, // Haftanın son günü biraz düşüş
  ];

  // Risk seviyesine göre renk belirle
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
  
  // Risk seviyesi metni
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
    <div className="container py-8 space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">İlerleme Takibi</h1>
        <Dices className="h-6 w-6 text-primary" />
      </div>
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
            <CardTitle>Risk Seviyesi</CardTitle>
            <CardDescription>Değerlendirme sonuçlarınıza göre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold mb-2 px-3 py-1 rounded-full inline-block ${getRiskLevelColor()}`}>
              {getRiskLevelText()}
            </div>
            <p className="text-sm text-muted-foreground mt-2">son değerlendirmenizden</p>
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
          <div className="mt-2 text-center text-sm text-muted-foreground">
            <p>10: Mükemmel, 1: Çok kötü</p>
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
