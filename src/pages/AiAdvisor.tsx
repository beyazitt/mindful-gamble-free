
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/providers/user-provider";
import { SendHorizontal, Bot, User, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

// Sample AI responses based on common user inputs
const aiResponses = [
  {
    keywords: ["merhaba", "selam", "naber", "nasılsın"],
    response: "Merhaba! Bugün size nasıl yardımcı olabilirim? Kumar alışkanlıklarınız, tetikleyicileriniz veya başa çıkma stratejileri hakkında sorularınız varsa yanıtlamaya hazırım."
  },
  {
    keywords: ["kumar", "oynamak", "istek", "dürtü"],
    response: "Kumar oynama dürtüsüyle başa çıkmak zor olabilir. Şu anda böyle bir dürtü yaşıyorsanız, derin nefes alıp vermeyi deneyin ve kendinize bu dürtünün geçici olduğunu hatırlatın. Dikkatinizi dağıtacak bir aktivite bulmak da yardımcı olabilir - kısa bir yürüyüş, sevdiğiniz birine telefon etmek veya hobi aktivitenize odaklanmak gibi."
  },
  {
    keywords: ["para", "borç", "kayıp", "finansal"],
    response: "Finansal zorluklar kumar bağımlılığının yaygın sonuçlarındandır. İlk adım olarak mevcut finansal durumunuzun dürüst bir değerlendirmesini yapın. Borçlarınızı listeleyip önceliklendirin. Bir bütçe oluşturun ve gerekirse profesyonel finansal danışmanlık hizmeti alın. Birçok kurum kumar bağımlılığından etkilenenler için özel finansal rehberlik sunar."
  },
  {
    keywords: ["aile", "ilişki", "arkadaş", "güven"],
    response: "Kumar, ilişkilere ciddi zarar verebilir. Güven yeniden inşa etmek zaman alır ve tutarlı eylemler gerektirir. Sevdiklerinize karşı dürüst olun, sorumluluk alın ve değişim için attığınız somut adımları gösterin. Aile terapisi düşünebilirsiniz - bu, hem sizin hem de ailenizin iyileşme sürecini destekleyebilir."
  },
  {
    keywords: ["tedavi", "profesyonel", "yardım", "terapi"],
    response: "Profesyonel yardım almak iyileşme yolculuğunuzda önemli bir adımdır. Bilişsel davranışçı terapi (BDT), kumar bağımlılığı tedavisinde kanıtlanmış bir yöntemdir. Yeşilay Danışmanlık Merkezi (YEDAM) ücretsiz danışmanlık hizmetleri sunar ve size en yakın destek kaynakları hakkında bilgi verebilir. Kaynaklar bölümünde daha fazla tedavi seçeneği bulabilirsiniz."
  },
  {
    keywords: ["tetikleyici", "risk", "durum"],
    response: "Tetikleyicilerinizi tanımak çok değerli bir farkındalıktır. Tetikleyicileriniz için bir günlük tutmayı deneyin - ne zaman, nerede ve neden kumar oynama dürtüsü hissettiğinizi not edin. Zamanla, bu durumlardan kaçınmak veya onlarla başa çıkmak için stratejiler geliştirebilirsiniz. Acil yardım sayfamızda kriz anında kullanabileceğiniz başa çıkma stratejileri bulunmaktadır."
  },
  {
    keywords: ["motivasyon", "tekrar", "başarısız", "vazgeçmek"],
    response: "İyileşme yolculuğunda geri adımlar atmak yaygındır ve tamamen başarısızlık anlamına gelmez. Her geri adım, kendiniz hakkında öğrenebileceğiniz bir fırsattır. Neyin tetiklediğini, hangi stratejilerin işe yaradığını ve hangilerinin geliştirilmesi gerektiğini düşünün. Kendinize karşı nazik olun ve başarısızlık olarak gördüğünüz şeyleri öğrenme deneyimleri olarak yeniden çerçevelendirin."
  },
  {
    keywords: ["hedef", "plan", "strateji"],
    response: "Hedefler belirlemek harika bir adım! Etkili olması için hedeflerinizin Belirli, Ölçülebilir, Ulaşılabilir, İlgili ve Zaman Sınırlı (SMART) olmasını sağlayın. Büyük hedefi küçük, yönetilebilir adımlara bölmek de yardımcı olur. Örneğin 'Asla kumar oynamamak' yerine, 'Bu hafta kumar oynamak için hiç para harcamayacağım' gibi daha ulaşılabilir bir hedef belirleyin."
  }
];

// Default messages to show when the user first visits the page
const defaultMessages: Message[] = [
  {
    id: "1",
    content: "Merhaba! Ben yapay zeka danışmanınız. Kumar bağımlılığı ile mücadelenizde size nasıl yardımcı olabilirim?",
    sender: "ai",
    timestamp: new Date()
  },
  {
    id: "2",
    content: "Sorularınızı yanıtlayabilir, başa çıkma stratejileri önerebilir veya motivasyonunuzu artıracak tavsiyeler sunabilirim. Lütfen bana nasıl yardımcı olabileceğimi söyleyin.",
    sender: "ai",
    timestamp: new Date()
  }
];

const AiAdvisor = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI thinking and then responding
    setTimeout(() => {
      const aiMessage = generateAiResponse(input);
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAiResponse = (userInput: string): Message => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Try to find a matching response based on keywords
    for (const item of aiResponses) {
      if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return {
          id: Date.now().toString(),
          content: item.response,
          sender: "ai",
          timestamp: new Date()
        };
      }
    }
    
    // Default response if no keywords match
    return {
      id: Date.now().toString(),
      content: "Anlıyorum. Kumar bağımlılığıyla mücadele karmaşık bir süreç olabilir. Spesifik bir konuda yardıma ihtiyacınız varsa (tetikleyiciler, başa çıkma stratejileri, motivasyon veya tedavi seçenekleri gibi) lütfen bana bildirin. Size daha iyi yardımcı olmak isterim.",
      sender: "ai",
      timestamp: new Date()
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container py-8 h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">AI Danışman</h1>
            <p className="text-muted-foreground">
              Kumar bağımlılığıyla ilgili sorularınızı yanıtlayabilir ve size rehberlik edebilirim
            </p>
          </div>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Bu bir AI asistanıdır ve profesyonel tıbbi tavsiye veremez. Acil durumlarda lütfen Acil Yardım sayfasındaki kaynakları kullanın.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Sohbet</CardTitle>
          <CardDescription>
            Kumar alışkanlıkları, tetikleyiciler, başa çıkma stratejileri veya iyileşme süreci hakkında sorular sorun
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pb-0">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Intl.DateTimeFormat("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(message.timestamp)}
                  </p>
                </div>
                
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <Textarea
              placeholder="Mesajınızı yazın..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[60px] resize-none"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="shrink-0"
            >
              <SendHorizontal className="h-5 w-5" />
              <span className="sr-only">Gönder</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AiAdvisor;
