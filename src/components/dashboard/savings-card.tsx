
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PiggyBank, Award } from "lucide-react";
import { useUser } from "@/providers/user-provider";

export const SavingsCard = () => {
  const { user } = useUser();

  return (
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
  );
};
