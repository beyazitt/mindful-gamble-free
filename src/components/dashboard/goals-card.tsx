
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Clock, PlusCircle } from "lucide-react";
import { useUser } from "@/providers/user-provider";

interface GoalsCardProps {
  onAddGoalClick: () => void;
}

export const GoalsCard = ({ onAddGoalClick }: GoalsCardProps) => {
  const { user } = useUser();
  
  const activeGoals = user.goals.filter(goal => !goal.completed).slice(0, 3);

  return (
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
          onClick={onAddGoalClick}
          variant="outline" 
          className="w-full"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Yeni Hedef Ekle
        </Button>
      </CardContent>
    </Card>
  );
};
