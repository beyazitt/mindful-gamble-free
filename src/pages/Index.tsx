
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/providers/user-provider";
import { ModeToggle } from "@/components/mode-toggle";

const Index = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcı onboarded ise ve değerlendirme tamamlanmışsa dashboard'a yönlendir
    if (user.onboarded && user.assessment.completed) {
      navigate("/dashboard");
    } 
    // Kullanıcı onboarded ise ama değerlendirme tamamlanmamışsa assessment'a yönlendir
    else if (user.onboarded && !user.assessment.completed) {
      navigate("/assessment");
    }
  }, [user, navigate]);

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

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Kumar Bağımlılığını Yenmek İçin <span className="text-primary">Yeni Yolunuz</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground">
            YeniYol, kumar bağımlılığı ile mücadele eden bireylere yapay zeka destekli, 
            kişiselleştirilmiş destek sunan bir uygulamadır. Sizi anlayan, yargılamayan 
            ve yolculuğunuzun her adımında yanınızda olan bir destek sistemi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" onClick={() => navigate("/introduction")}>
              Hemen Başla
            </Button>
            <Button variant="outline" size="lg">
              Daha Fazla Bilgi
            </Button>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 border-t">
        <p className="text-sm text-muted-foreground">
          YeniYol &copy; {new Date().getFullYear()} - Kumar Bağımlılığı ile Mücadele
        </p>
      </footer>
    </div>
  );
};

export default Index;
