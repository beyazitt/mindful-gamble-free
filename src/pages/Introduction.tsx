
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/providers/user-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const IntroSteps = [
  {
    title: "Hoş Geldiniz",
    description: "YeniYol uygulamasına hoş geldiniz. Kumar bağımlılığı ile mücadele yolundaki bu cesur adımınız için sizi tebrik ediyoruz.",
    content: (
      <div className="space-y-4">
        <p>
          Bu uygulama, kumar bağımlılığı ile mücadele etmenize yardımcı olmak için tasarlanmıştır. 
          Size kişiselleştirilmiş destek, ilerlemenizi takip etme araçları, eğitici içerikler ve 
          ihtiyaç duyduğunuzda iletişime geçebileceğiniz bir AI danışman sunuyoruz.
        </p>
        <p>
          Unutmayın, bu yolculukta yalnız değilsiniz. YeniYol ekibi ve topluluğu her adımda yanınızda.
        </p>
      </div>
    )
  },
  {
    title: "Uygulama Özellikleri",
    description: "YeniYol'un size sunduğu temel özelliklere göz atalım.",
    content: (
      <div className="grid gap-4">
        <div className="rounded-lg border p-3">
          <h4 className="font-medium">Kişisel Değerlendirme</h4>
          <p className="text-sm text-muted-foreground">Kumar alışkanlıklarınızı ve bağımlılık düzeyinizi anlamanıza yardımcı olacak testler.</p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="font-medium">İlerleme Takibi</h4>
          <p className="text-sm text-muted-foreground">Kumar oynamadığınız günleri izleyin ve başarılarınızı kutlayın.</p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="font-medium">AI Danışman</h4>
          <p className="text-sm text-muted-foreground">7/24 size destek olacak, sorularınızı yanıtlayacak yapay zeka asistanı.</p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="font-medium">Eğitim Kaynakları</h4>
          <p className="text-sm text-muted-foreground">Kumar bağımlılığını anlamanız ve yenmeniz için gerekli bilgiler.</p>
        </div>
      </div>
    )
  },
  {
    title: "Profilinizi Oluşturun",
    description: "İlerleyişinizi takip etmek için basit bir profil oluşturalım.",
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">İsminiz</Label>
          <Input id="name" placeholder="İsminizi girin" />
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Gizliliğiniz bizim için önemli. Tüm verileriniz cihazınızda saklanır ve sizinle kalır. 
          E-posta adresi veya telefon numarası istemiyor, kişisel bilgilerinizi toplamıyoruz.
        </p>
      </div>
    )
  },
  {
    title: "Değerlendirmeye Hazır mısınız?",
    description: "Son adım olarak, kumar alışkanlıklarınızı değerlendireceğiz.",
    content: (
      <div className="space-y-4">
        <p>
          Bir sonraki adımda, kumar alışkanlıklarınız ve bağımlılık düzeyiniz hakkında daha iyi bir 
          fikir edinmemize yardımcı olacak kısa bir değerlendirme testi yapacaksınız.
        </p>
        <p>
          Bu test yaklaşık 5 dakika sürecek ve yanıtlarınız sadece size daha iyi destek vermemiz için kullanılacaktır.
        </p>
        <p className="font-medium">
          Hazır olduğunuzda "Değerlendirmeye Başla" butonuna tıklayın.
        </p>
      </div>
    )
  }
];

const Introduction = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep === 2) {
      // Profil oluşturma adımını kontrol et
      if (!name.trim()) {
        toast({
          title: "İsim gerekli",
          description: "Lütfen devam etmek için isminizi girin.",
          variant: "destructive",
        });
        return;
      }
      // Kullanıcı ismini kaydet
      updateUser({ name, onboarded: true });
    }

    if (currentStep === IntroSteps.length - 1) {
      // Son adımdan sonra değerlendirmeye yönlendir
      navigate("/assessment");
    } else {
      // Sonraki adıma geç
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const currentStepData = IntroSteps[currentStep];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-bold">
            YY
          </div>
          <h1 className="text-lg font-bold">YeniYol</h1>
        </div>
        <ModeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>{currentStepData.title}</CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            {currentStep === 2 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">İsminiz</Label>
                  <Input 
                    id="name" 
                    placeholder="İsminizi girin" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Gizliliğiniz bizim için önemli. Tüm verileriniz cihazınızda saklanır ve sizinle kalır. 
                  E-posta adresi veya telefon numarası istemiyor, kişisel bilgilerinizi toplamıyoruz.
                </p>
              </div>
            ) : (
              currentStepData.content
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Geri
            </Button>
            <div className="flex items-center gap-1">
              {IntroSteps.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <Button onClick={handleNext}>
              {currentStep === IntroSteps.length - 1 ? "Değerlendirmeye Başla" : "Devam Et"}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Introduction;
