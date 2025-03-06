
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ResourcesCard = () => {
  const navigate = useNavigate();

  return (
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
  );
};
