
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/providers/user-provider";
import { Progress as ProgressIndicator } from "@/components/ui/progress";
import { Dices, Trophy, Check, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Progress = () => {
  const { user, updateProgress } = useUser();
  const { toast } = useToast();
  
  // Milestone definitions
  const milestones = [
    { days: 1, title: "İlk Gün", description: "Kumar oynamadan ilk günü tamamladınız" },
    { days: 3, title: "Mini Seri", description: "3 gün kumar oynamadan durabildiniz" },
    { days: 7, title: "1 Hafta Temiz", description: "Tam bir hafta kumar oynamadınız" },
    { days: 14, title: "2 Hafta Güçlü", description: "İki hafta boyunca direndiniz" },
    { days: 30, title: "1 Ay Başarı", description: "Bir ay boyunca kumarsız yaşadınız" },
    { days: 90, title: "Çeyrek Yıl", description: "Üç ay boyunca kumar alışkanlığınızı yendiniz" },
    { days: 180, title: "Yarım Yıl", description: "Altı ay boyunca yeni alışkanlıklar edindiniz" },
    { days: 365, title: "1 Yıl Dönüm Noktası", description: "Tam bir yıl kumar oynamadınız!" },
  ];

  // Calculate completed milestones
  const completedMilestones = milestones.filter(
    milestone => user.progress.gambleFreeDays >= milestone.days
  );

  // Calculate recovery progress percentages based on completed milestones
  const calculateProgressPercentage = () => {
    const totalMilestones = milestones.length;
    return Math.min(Math.round((completedMilestones.length / totalMilestones) * 100), 100);
  };

  // Calculate impulse control percentage based on streak days
  const calculateImpulseControlPercentage = () => {
    // Set max at 30 days for 100%
    return Math.min(Math.round((user.progress.streakDays / 30) * 100), 100);
  };

  // Risk level color and text functions
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

  // Check if any new milestone reached and show a toast notification
  useEffect(() => {
    const lastReachedMilestone = completedMilestones[completedMilestones.length - 1];
    
    if (lastReachedMilestone && user.progress.gambleFreeDays === lastReachedMilestone.days) {
      toast({
        title: "Tebrikler! 🎉",
        description: `${lastReachedMilestone.title} hedefine ulaştınız. ${lastReachedMilestone.description}`,
      });
    }
  }, [user.progress.gambleFreeDays, completedMilestones, toast]);

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
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Başarı Hedefleri
          </CardTitle>
          <CardDescription>Kumar bağımlılığından kurtulma yolculuğunuzda ulaştığınız hedefler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {milestones.map((milestone) => {
              const isCompleted = user.progress.gambleFreeDays >= milestone.days;
              const isUpcoming = user.progress.gambleFreeDays >= (milestone.days / 2) && !isCompleted;
              
              return (
                <div 
                  key={milestone.days}
                  className={`border rounded-lg p-4 transition-all ${
                    isCompleted 
                      ? 'border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900' 
                      : isUpcoming 
                        ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900'
                        : 'border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-full ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
                      }`}>
                        {isCompleted ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <h3 className="font-medium">{milestone.title}</h3>
                    </div>
                    <span className={`text-sm font-medium ${
                      isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
                    }`}>
                      {milestone.days} gün
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.description}</p>
                  {isUpcoming && !isCompleted && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div 
                          className="bg-amber-500 h-2 rounded-full" 
                          style={{ width: `${(user.progress.gambleFreeDays / milestone.days) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-right mt-1 text-amber-600 dark:text-amber-400">
                        {user.progress.gambleFreeDays}/{milestone.days} gün
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
                <span className="text-sm font-medium">Hedeflere Ulaşma</span>
                <span className="text-sm font-medium">{calculateProgressPercentage()}%</span>
              </div>
              <ProgressIndicator value={calculateProgressPercentage()} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Dürtü Kontrolü</span>
                <span className="text-sm font-medium">{calculateImpulseControlPercentage()}%</span>
              </div>
              <ProgressIndicator value={calculateImpulseControlPercentage()} className="h-2" />
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
