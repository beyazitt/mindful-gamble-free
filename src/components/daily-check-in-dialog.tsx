
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@/providers/user-provider";

interface DailyCheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (gambleFree: boolean) => void;
}

const DailyCheckInDialog = ({ open, onOpenChange, onComplete }: DailyCheckInDialogProps) => {
  const [gambleFree, setGambleFree] = useState<boolean | null>(null);
  const [amount, setAmount] = useState<string>("");
  const { updateProgress, user } = useUser();

  const handleComplete = () => {
    if (gambleFree === null) return;

    // Tasarruf edilen miktarı güncelle
    if (gambleFree && amount) {
      const savedAmount = parseFloat(amount) || 0;
      updateProgress({
        savings: user.progress.savings + savedAmount
      });
    }

    onComplete(gambleFree);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Günlük Kontrol</DialogTitle>
          <DialogDescription>
            Günlük girişinizi yaparak ilerlemenizi takip edin.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="gamblingStatus" className="text-base">
              Bugün kumar oynadınız mı?
            </Label>
            <RadioGroup
              id="gamblingStatus"
              value={gambleFree === null ? undefined : gambleFree ? "no" : "yes"}
              className="grid grid-cols-2 gap-4"
              onValueChange={(value) => setGambleFree(value === "no")}
            >
              <div>
                <RadioGroupItem
                  value="no"
                  id="gambleNo"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="gambleNo"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span className="text-xl mb-1">😊</span>
                  <span className="font-semibold">Hayır</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="yes"
                  id="gambleYes"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="gambleYes"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span className="text-xl mb-1">😔</span>
                  <span className="font-semibold">Evet</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {gambleFree === true && (
            <div className="space-y-2">
              <Label htmlFor="savedAmount" className="text-base">
                Bugün kumar oynamayarak yaklaşık ne kadar para biriktirdiniz?
              </Label>
              <div className="flex">
                <Input
                  id="savedAmount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="rounded-r-none"
                  min="0"
                />
                <div className="flex items-center justify-center px-3 py-2 border border-l-0 bg-muted rounded-r-md">
                  ₺
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Normalde kumar için harcayacağınız yaklaşık miktarı girin.
              </p>
            </div>
          )}

          {gambleFree === false && (
            <div className="space-y-2 py-2">
              <p className="text-sm">
                Endişelenmeyin, bu bir yolculuk ve başarısızlıklar da sürecin bir parçası. 
                Kendinize nazik davranın ve yarın yeni bir gün için hazır olun.
              </p>
              <p className="text-sm font-medium">
                İhtiyaç duyarsanız, yardım almaktan çekinmeyin:
              </p>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => onOpenChange(false)}
              >
                Destek Kaynakları
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button 
            onClick={handleComplete} 
            disabled={gambleFree === null}
          >
            Kaydet ve Devam Et
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DailyCheckInDialog;
