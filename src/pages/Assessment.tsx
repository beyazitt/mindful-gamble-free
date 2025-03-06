
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/providers/user-provider";
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Info } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const assessmentQuestions = [
  {
    id: "frequency",
    question: "Son 12 ay içinde ne sıklıkla kumar oynadınız?",
    options: [
      { value: "0", label: "Hiç" },
      { value: "1", label: "Ayda birden az" },
      { value: "2", label: "Ayda 1-3 kez" },
      { value: "3", label: "Haftada bir ya da daha fazla" },
      { value: "4", label: "Neredeyse her gün" }
    ]
  },
  {
    id: "amount",
    question: "Tipik bir kumar seansında ne kadar para harcarsınız?",
    options: [
      { value: "0", label: "Kumar oynamıyorum" },
      { value: "1", label: "Küçük miktarlar (günlük bütçemi etkilemez)" },
      { value: "2", label: "Orta miktarlar (hissettiğim ama idare edebileceğim)" },
      { value: "3", label: "Büyük miktarlar (mali zorluk yaratabilen)" },
      { value: "4", label: "Çok büyük miktarlar (finansal durumumu ciddi şekilde etkileyen)" }
    ]
  },
  {
    id: "control",
    question: "Kumar oynamayı durdurmakta ne kadar zorlanıyorsunuz?",
    options: [
      { value: "0", label: "Hiç zorlanmıyorum / Kumar oynamıyorum" },
      { value: "1", label: "Nadiren zorlanıyorum" },
      { value: "2", label: "Bazen zorlanıyorum" },
      { value: "3", label: "Sıklıkla zorlanıyorum" },
      { value: "4", label: "Neredeyse her zaman zorlanıyorum" }
    ]
  },
  {
    id: "chasing",
    question: "Kaybettiğiniz parayı geri kazanmak için tekrar kumar oynamaya ne sıklıkla geri dönüyorsunuz?",
    options: [
      { value: "0", label: "Hiçbir zaman / Kumar oynamıyorum" },
      { value: "1", label: "Nadiren" },
      { value: "2", label: "Bazen" },
      { value: "3", label: "Sıklıkla" },
      { value: "4", label: "Neredeyse her zaman" }
    ]
  },
  {
    id: "lifeImpact",
    question: "Kumar oynamak hayatınızın diğer alanlarını (iş, ilişkiler, sağlık) ne kadar etkiliyor?",
    options: [
      { value: "0", label: "Hiç etkilemiyor / Kumar oynamıyorum" },
      { value: "1", label: "Çok az etkiliyor" },
      { value: "2", label: "Biraz etkiliyor" },
      { value: "3", label: "Oldukça etkiliyor" },
      { value: "4", label: "Ciddi şekilde etkiliyor" }
    ]
  },
  {
    id: "borrowing",
    question: "Kumar oynamak için hiç borç aldınız mı veya bir şey sattınız mı?",
    options: [
      { value: "0", label: "Hiçbir zaman" },
      { value: "1", label: "Nadiren, küçük miktarlar" },
      { value: "2", label: "Bazen" },
      { value: "3", label: "Sıklıkla" },
      { value: "4", label: "Düzenli olarak büyük miktarlarda" }
    ]
  },
  {
    id: "lying",
    question: "Kumar oynama alışkanlıklarınız hakkında başkalarına hiç yalan söylediniz mi?",
    options: [
      { value: "0", label: "Hiçbir zaman" },
      { value: "1", label: "Nadiren" },
      { value: "2", label: "Bazen" },
      { value: "3", label: "Sıklıkla" },
      { value: "4", label: "Neredeyse her zaman" }
    ]
  },
  {
    id: "quit",
    question: "Kumar oynamayı bırakmayı veya azaltmayı denediniz mi? Nasıl sonuçlandı?",
    options: [
      { value: "0", label: "Kumar oynamıyorum / Sorun yaşamıyorum" },
      { value: "1", label: "Bırakmayı denedim ve başarılı oldum" },
      { value: "2", label: "Azaltmayı başardım" },
      { value: "3", label: "Denedim ama başarılı olamadım" },
      { value: "4", label: "Birçok kez denedim ama başarılı olamadım" }
    ]
  },
  {
    id: "mood",
    question: "Kumar oynamadığınızda kendinizi nasıl hissediyorsunuz?",
    options: [
      { value: "0", label: "Normal / Kumar oynamıyorum" },
      { value: "1", label: "Bazen sıkılmış" },
      { value: "2", label: "Sıklıkla huzursuz veya endişeli" },
      { value: "3", label: "Genellikle gergin, sinirli veya üzgün" },
      { value: "4", label: "Çok huzursuz, depresif veya saldırgan" }
    ]
  },
  {
    id: "triggers",
    question: "Hangi durumlar kumar oynama isteğinizi tetikliyor? (Birden fazla seçilebilir)",
    options: [
      { value: "stress", label: "Stres veya kaygı" },
      { value: "boredom", label: "Can sıkıntısı" },
      { value: "social", label: "Sosyal ortamlar" },
      { value: "financial", label: "Mali sorunlar" },
      { value: "ads", label: "Kumar reklamları/promosyonları" },
      { value: "alcohol", label: "Alkol tüketimi" },
      { value: "none", label: "Hiçbiri / Kumar oynamıyorum" }
    ],
    multiSelect: true
  }
];

const Assessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const { updateAssessment, user } = useUser();
  const navigate = useNavigate();

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / assessmentQuestions.length) * 100;

  const handleOptionSelect = (value: string) => {
    if (currentQuestion.multiSelect) {
      // Çoklu seçim işlemi
      const currentValues = answers[currentQuestion.id] as string[] || [];
      const valueIndex = currentValues.indexOf(value);
      
      let newValues: string[];
      if (value === "none") {
        // "Hiçbiri" seçilirse diğer seçenekleri temizle
        newValues = ["none"];
      } else {
        // "Hiçbiri" dışında bir seçenek seçilirse "Hiçbiri"ni kaldır
        if (valueIndex === -1) {
          newValues = [...currentValues.filter(v => v !== "none"), value];
        } else {
          newValues = currentValues.filter(v => v !== value);
        }
      }
      
      setAnswers({ ...answers, [currentQuestion.id]: newValues });
    } else {
      // Tekli seçim işlemi
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const isOptionSelected = (value: string) => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.multiSelect) {
      return (answer as string[] || []).includes(value);
    }
    return answer === value;
  };

  const isNextDisabled = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.multiSelect) {
      return !answer || (answer as string[]).length === 0;
    }
    return !answer;
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Tüm sorular cevaplandıysa sonuçları göster
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    // Puanlama hesaplaması
    let totalScore = 0;
    let questionCount = 0;

    // Çoklu seçim dışındaki soruların puanlarını topla
    assessmentQuestions.forEach(q => {
      if (!q.multiSelect && answers[q.id]) {
        totalScore += parseInt(answers[q.id] as string);
        questionCount++;
      }
    });

    // Ortalama skoru hesapla (0-4 arasında)
    const averageScore = questionCount > 0 ? totalScore / questionCount : 0;
    
    // Risk seviyesini belirle
    let riskLevel: 'low' | 'moderate' | 'high' = 'low';
    if (averageScore >= 3) {
      riskLevel = 'high';
    } else if (averageScore >= 1.5) {
      riskLevel = 'moderate';
    }

    // Kullanıcı verilerini güncelle
    updateAssessment({
      completed: true,
      riskLevel,
      score: parseFloat(averageScore.toFixed(1)),
      date: new Date().toISOString()
    });

    // Tetikleyicileri kaydet (multiSelect soru)
    const triggersQuestion = assessmentQuestions.find(q => q.id === "triggers");
    if (triggersQuestion && answers[triggersQuestion.id]) {
      const triggerValues = answers[triggersQuestion.id] as string[];
      if (!triggerValues.includes('none')) {
        updateUser({
          progress: {
            ...user.progress,
            triggers: triggerValues
          }
        });
      }
    }

    setShowResults(true);
  };

  const handleComplete = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Kumar Alışkanlıkları Değerlendirmesi</CardTitle>
          <CardDescription>
            Bu değerlendirme kumar alışkanlıklarınızı ve bağımlılık riskinizi anlamanıza yardımcı olacaktır.
            Lütfen her soruyu dürüstçe yanıtlayın.
          </CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    Soru {currentQuestionIndex + 1} / {assessmentQuestions.length}
                  </p>
                </div>
                {currentQuestion.id === "triggers" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Bu soruda birden fazla seçenek işaretleyebilirsiniz.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              {currentQuestion.multiSelect ? (
                <div className="space-y-2">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-center p-3 rounded-md border transition-colors cursor-pointer ${
                        isOptionSelected(option.value)
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => handleOptionSelect(option.value)}
                    >
                      <div className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-primary">
                        {isOptionSelected(option.value) && <Check className="h-3.5 w-3.5 text-primary" />}
                      </div>
                      <Label className="flex-1 cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup
                  value={answers[currentQuestion.id] as string}
                  className="space-y-2"
                >
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-center p-3 rounded-md border transition-colors cursor-pointer ${
                        isOptionSelected(option.value)
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => handleOptionSelect(option.value)}
                    >
                      <RadioGroupItem 
                        value={option.value} 
                        id={`${currentQuestion.id}-${option.value}`}
                        className="mr-3"
                      />
                      <Label
                        htmlFor={`${currentQuestion.id}-${option.value}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Değerlendirme Tamamlandı</h3>
              <p className="text-muted-foreground mb-6">
                Yanıtlarınız başarıyla kaydedildi. Şimdi size özel yolculuğunuza başlayabilirsiniz.
              </p>
              <Button onClick={handleComplete}>Ana Sayfaya Git</Button>
            </div>
          )}
        </CardContent>
        {!showResults && (
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Önceki
            </Button>
            <Button
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              {currentQuestionIndex === assessmentQuestions.length - 1 ? "Tamamla" : "Sonraki"}
            </Button>
          </CardFooter>
        )}
      </Card>

      <AlertDialog open={user.assessment.completed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Değerlendirme Zaten Tamamlandı</AlertDialogTitle>
            <AlertDialogDescription>
              Daha önce kumar alışkanlıkları değerlendirmesini tamamladınız. Ana sayfaya yönlendiriliyorsunuz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => navigate("/dashboard")}>
              Anladım
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Assessment;
