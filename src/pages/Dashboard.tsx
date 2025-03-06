
import { useUser } from "@/providers/user-provider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DailyCheckInDialog from "@/components/daily-check-in-dialog";
import { GoalForm } from "@/components/goal-form";
import { StatusCards } from "@/components/dashboard/status-cards";
import { DailyCheckInCard } from "@/components/dashboard/daily-check-in-card";
import { GoalsCard } from "@/components/dashboard/goals-card";
import { ResourcesCard } from "@/components/dashboard/resources-card";
import { SavingsCard } from "@/components/dashboard/savings-card";

const Dashboard = () => {
  const { user, updateProgress } = useUser();
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Merhaba, {user.name}!</h1>
        <p className="text-muted-foreground">
          Yolculuğunuzun bugünkü durumunu görebilir ve ilerlemelerinizi takip edebilirsiniz.
        </p>
      </div>

      <StatusCards />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <DailyCheckInCard onCheckInClick={() => setShowCheckIn(true)} />
        
        <GoalsCard onAddGoalClick={() => setShowGoalForm(true)} />

        <ResourcesCard />

        <SavingsCard />
      </div>

      <DailyCheckInDialog open={showCheckIn} onOpenChange={setShowCheckIn} onComplete={handleCheckInComplete} />
      
      <GoalForm open={showGoalForm} onOpenChange={setShowGoalForm} />
    </div>
  );
};

export default Dashboard;
