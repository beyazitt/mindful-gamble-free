
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, Calendar, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const { toast } = useToast();
  const [commentInput, setCommentInput] = useState("");

  const handlePostComment = () => {
    if (commentInput.trim()) {
      toast({
        title: "Yorum gönderildi",
        description: "Yorumunuz topluluk yöneticileri tarafından onaylandıktan sonra görünecektir.",
      });
      setCommentInput("");
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">Topluluk</h1>
      <p className="text-muted-foreground">Benzer zorluklarla mücadele eden kişilerle bağlantı kurun, deneyimleri paylaşın ve destek alın.</p>
      
      <div className="flex justify-between items-center">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Paylaşımlar</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Gruplar</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Etkinlikler</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Can A.</div>
                    <div className="text-xs text-muted-foreground">3 gün önce</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>1 ay önce kumarsız yaşamaya başladım ve şimdiden hayatımda büyük bir değişim görüyorum. Artık daha fazla zamanım var ve mali durumum iyileşiyor. Bazen zorlanıyorum ama bu topluluk sayesinde her gün daha da güçleniyorum. Herkese desteği için teşekkür ederim! 💪</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex gap-6">
                  <Button variant="ghost" size="sm" className="flex gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>48</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>12</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="flex gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>Paylaş</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>ES</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Esra S.</div>
                    <div className="text-xs text-muted-foreground">5 gün önce</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>Bugün kumar oynamamın tetikleyicilerini fark ettim - genellikle stresli olduğumda veya kendimi yalnız hissettiğimde başlıyor. Şimdi bu duygular geldiğinde yürüyüşe çıkmayı veya bir arkadaşımı aramayı deniyorum. Bazen işe yarıyor, bazen yaramıyor ama en azından farkındalık kazandım.</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex gap-6">
                  <Button variant="ghost" size="sm" className="flex gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>36</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>8</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="flex gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>Paylaş</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Düşüncelerinizi Paylaşın</CardTitle>
                <CardDescription>Deneyimlerinizi, zorluklarınızı ve başarılarınızı toplulukla paylaşın.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Paylaşmak istediğiniz deneyiminizi yazın..." 
                  className="min-h-[120px]"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="secondary">İptal</Button>
                <Button onClick={handlePostComment} disabled={!commentInput.trim()}>Paylaş</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <GroupCard 
                name="Yeni Başlayanlar" 
                memberCount={156} 
                description="Kumar bağımlılığını yeni fark edip değişim için adım atmak isteyenler için destek grubu."
              />
              <GroupCard 
                name="İyileşme Yolculuğu" 
                memberCount={98} 
                description="Kumar bağımlılığından kurtulma sürecindeki kişiler için motivasyon ve destek grubu."
              />
              <GroupCard 
                name="Aile Desteği" 
                memberCount={73} 
                description="Kumar bağımlısı olan yakınlarına destek olmak isteyen aile üyeleri için."
              />
              <GroupCard 
                name="Mali İyileşme" 
                memberCount={122} 
                description="Kumar nedeniyle oluşan mali sorunları aşma stratejileri geliştirme grubu."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <EventCard 
                title="Çevrimiçi Destek Toplantısı" 
                date="12 Haziran 2023, 19:00" 
                attendees={28}
                description="Kumar davranışını kontrol etmede pratik stratejiler konulu haftalık destek toplantısı."
              />
              <EventCard 
                title="Mali Planlama Atölyesi" 
                date="18 Haziran 2023, 15:00" 
                attendees={42}
                description="Kumar kaynaklı borçları yönetme ve mali düzen kurma hakkında interaktif çalıştay."
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-2">Topluluk Kuralları</h3>
        <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
          <li>Diğer üyelere saygılı ve destekleyici olun</li>
          <li>Gizliliği koruyun ve başkalarının özel bilgilerini paylaşmayın</li>
          <li>Sağlık tavsiyesi vermekten kaçının, profesyonel yardım önerileri için kaynaklar bölümünü kullanın</li>
          <li>Kumar oynama yöntemleri, stratejileri veya fırsatları hakkında içerik paylaşmayın</li>
          <li>Yeni başlayanlara karşı anlayışlı olun ve destekleyici bir ortam yaratın</li>
        </ul>
      </div>
    </div>
  );
};

// Helper component for group cards
const GroupCard = ({ name, memberCount, description }: { 
  name: string;
  memberCount: number;
  description: string;
}) => {
  const { toast } = useToast();
  
  const handleJoin = () => {
    toast({
      title: "Gruba katıldınız",
      description: `${name} grubuna başarıyla katıldınız.`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{memberCount} üye</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleJoin} className="w-full">Katıl</Button>
      </CardFooter>
    </Card>
  );
};

// Helper component for event cards
const EventCard = ({ title, date, attendees, description }: { 
  title: string;
  date: string;
  attendees: number;
  description: string;
}) => {
  const { toast } = useToast();
  
  const handleAttend = () => {
    toast({
      title: "Etkinliğe katılım",
      description: `${title} etkinliğine katılımınız onaylandı.`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
        <div className="mt-2 text-sm text-muted-foreground">{attendees} kişi katılıyor</div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAttend} className="w-full">Katıl</Button>
      </CardFooter>
    </Card>
  );
};

export default Community;
