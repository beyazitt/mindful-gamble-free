import { useUser } from "@/providers/user-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CalendarCheck, 
  TrendingUp, 
  AlertTriangle, 
  Award,
  Target,
  ArrowRight,
  PiggyBank,
  PlusCircle,
  Clock,
  CheckCircle2,
  BookOpen,
  Dices
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DailyCheckInDialog from "@/components/daily-check-in-dialog";
import { Separator } from "@/components/ui/separator";
import { GoalForm } from "@/components/goal-form";

const Dashboard = () => {
  const { user, updateProgress } = useUser();
  const navigate = useNavigate();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const lastCheckIn = user.progress.lastCheckIn ? new Date(user.progress.lastCheckIn) : null;
    const today = new Date();
    
    if (!lastCheckIn || 
        lastCheckIn.getDate() !== today.getDate() || 
        lastCheckIn.getMonth() !== today.getMonth() ||
        lastCheckIn.getFullYear() !== today.getFullYear()) {
      setTimeout(() => {
        setShowCheckIn(true);
      }, 1000);
    }
  }, [user.progress.lastCheckIn]);

  const handleCheckInComplete = (gambleFree: boolean) => {
    const today = new Date();
    
    updateProgress({
      lastCheckIn: today.toISOString(),
      gambleFreeDays: gambleFree 
        ? user.progress.gambleFreeDays + 1 
        : user.progress.gambleFreeDays,
      streakDays: gambleFree 
        ? user.progress.streakDays + 1 
        : 0
    });

    setShowCheckIn(false);
    
    if (gambleFree) {
      if ((user.progress.gambleFreeDays + 1) % 7 === 0) {
        toast({
          title: "Tebrikler! Yeni bir hafta tamamlandı! 🎉",
          description: `${user.progress.gambleFreeDays + 1} gündür kumar oynamadınız.`,
        });
      } else {
        toast({
          title: "Günlük giriş tamamlandı",
          description: "Kumar oynamadığınız için kendinizle gurur duyabilirsiniz!",
        });
      }
    }
  };

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

  const activeGoals = user.goals.filter(goal => !goal.completed).slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Merhaba, {user.name}!</h1>
        <p className="text-muted-foreground">
          Yolculuğunuzun bugünkü durumunu görebilir ve ilerlemelerinizi takip edebilirsiniz.
        </p>
      </div>

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

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
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
                onClick={() => setShowCheckIn(true)}
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Hedeflerim</span>
            </CardTitle>
            <CardDescription>
              Kişisel hedeflerinizi belirleyin ve takip edin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeGoals.length > 0 ? (
              <>
                {activeGoals.map((goal) => (
                  <div key={goal.id} className="border rounded-md p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{goal.title}</p>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      {goal.dueDate && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(goal.dueDate).toLocaleDateString('tr-TR')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Henüz bir hedef belirlemediniz</p>
              </div>
            )}
            <Button 
              onClick={() => setShowGoalForm(true)}
              variant="outline" 
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni Hedef Ekle
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Önerilen Kaynaklar</span>
            </CardTitle>
            <CardDescription>
              Size özel seçilmiş faydalı bilgiler ve araçlar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-3 hover:bg-accent cursor-pointer" 
                 onClick={() => navigate("/resources")}>
              <p className="font-medium">Kumar Bağımlılığını Anlamak</p>
              <p className="text-sm text-muted-foreground">Kumar bağımlılığının psikolojik temelleri</p>
            </div>
            <div className="border rounded-md p-3 hover:bg-accent cursor-pointer"
                 onClick={() => navigate("/resources")}>
              <p className="font-medium">Sağlıklı Başa Çıkma Stratejileri</p>
              <p className="text-sm text-muted-foreground">Kumar isteği ile başa çıkmanın yolları</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/resources")}
            >
              <span>Tüm Kaynakları Gör</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              <span>Finansal Birikimler</span>
            </CardTitle>
            <CardDescription>
              Kumar oynamadığınız günlerde biriken tasarruflarınız
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Toplam Birikiminiz</p>
                <p className="text-3xl font-bold">{user.progress.savings.toLocaleString()} ₺</p>
              </div>
              <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                <Award className="h-7 w-7 text-primary" />
              </div>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">
              Kumar oynamak yerine paranızı biriktirerek hem mali durumunuzu iyileştiriyor hem de 
              kendinize yeni ödüller için fırsat yaratıyorsunuz.
            </p>
          </CardContent>
        </Card>
      </div>

      <DailyCheckInDialog open={showCheckIn} onOpenChange={setShowCheckIn} onComplete={handleCheckInComplete} />
      
      <GoalForm open={showGoalForm} onOpenChange={setShowGoalForm} />
    </div>
  );
};

export default Dashboard;
