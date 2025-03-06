
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/user-provider";
import { AlertTriangle, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmergencyHelp = () => {
  const { user } = useUser();
  
  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <h1 className="text-3xl font-bold">Acil Yardım</h1>
      </div>
      <p className="text-muted-foreground">
        Kumar oynama dürtüsü veya krizi yaşıyorsanız, bu sayfadaki kaynaklar size yardımcı olabilir.
        Unutmayın, yardım istemek güçlü olmanın bir göstergesidir.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-red-50 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Acil Yardım Hatları
            </CardTitle>
            <CardDescription>
              7/24 destek ve danışmanlık hizmetleri
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="font-medium">Yeşilay Danışmanlık Merkezi (YEDAM)</div>
              <div className="text-sm text-muted-foreground mt-1">Bağımlılıkla mücadelede ücretsiz danışmanlık</div>
              <Button variant="outline" className="mt-3 w-full" asChild>
                <a href="tel:115">115</a>
              </Button>
            </div>
            
            <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="font-medium">Alo 191 Uyuşturucu ile Mücadele Danışma Hattı</div>
              <div className="text-sm text-muted-foreground mt-1">Bağımlılık için 7/24 danışma ve yönlendirme</div>
              <Button variant="outline" className="mt-3 w-full" asChild>
                <a href="tel:191">191</a>
              </Button>
            </div>
            
            <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="font-medium">Ulusal Kriz Hattı</div>
              <div className="text-sm text-muted-foreground mt-1">Psikolojik kriz durumları için yardım hattı</div>
              <Button variant="outline" className="mt-3 w-full" asChild>
                <a href="tel:112">112</a>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Acil Durum Kişileriniz</CardTitle>
            <CardDescription>
              Zor zamanlarınızda size destek olabilecek kişiler
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.emergencyContacts && user.emergencyContacts.length > 0 ? (
              <div className="space-y-4">
                {user.emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.phone}</div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${contact.phone}`}>Ara</a>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Henüz acil durum kişisi eklenmemiş</p>
                <Button asChild>
                  <a href="/settings">Kişi Ekle</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="coping">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="coping">Başa Çıkma Stratejileri</TabsTrigger>
          <TabsTrigger value="centers">Tedavi Merkezleri</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coping" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Kriz Anında Başa Çıkma Stratejileri</CardTitle>
              <CardDescription>Kumar oynama dürtüsü ile başa çıkmak için hızlı teknikler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">1. Derin Nefes Alma</h3>
                <p className="text-sm text-muted-foreground">
                  Yavaşça 4 saniye nefes alın, 4 saniye tutun ve 6 saniye verin. 
                  Bu teknik, kaygıyı azaltmaya ve dürtülerinizi kontrol etmeye yardımcı olur.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">2. Erteleme Tekniği</h3>
                <p className="text-sm text-muted-foreground">
                  Kumar oynama dürtüsü hissettiğinizde, "Bunu 30 dakika erteleyeceğim" deyin. 
                  Bu süre içinde başka bir aktivite yapın. Genellikle dürtü zamanla azalır.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">3. HALT Kontrolü Yapın</h3>
                <p className="text-sm text-muted-foreground">
                  Aç (Hungry), Öfkeli (Angry), Yalnız (Lonely) veya Yorgun (Tired) musunuz? 
                  Bu durumlar dürtüleri tetikleyebilir. Önce bu temel ihtiyaçlarınızı karşılayın.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">4. Fiziksel Aktivite</h3>
                <p className="text-sm text-muted-foreground">
                  Hızlı bir yürüyüş, koşu veya evde yapabileceğiniz egzersizler beyninizdeki 
                  kimyasalları değiştirir ve dürtülerinizi azaltmaya yardımcı olur.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">5. Destek İsteyin</h3>
                <p className="text-sm text-muted-foreground">
                  Güvendiğiniz bir arkadaşınızı veya aile üyenizi arayın. 
                  Duygularınızı paylaşmak sizi rahatlatabilir ve dürtülerinizi kontrol etmenize yardımcı olabilir.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="centers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tedavi ve Destek Merkezleri</CardTitle>
              <CardDescription>Kumar bağımlılığı için profesyonel destek alabileceğiniz yerler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <CenterCard
                  name="Yeşilay Danışmanlık Merkezi (YEDAM)"
                  address="Çeşitli illerde merkezler"
                  phone="115"
                  hours="Hafta içi 09:00-17:00"
                  website="https://www.yesilay.org.tr/tr/yedam"
                />
                
                <CenterCard
                  name="Bakırköy Prof. Dr. Mazhar Osman Ruh Sağlığı ve Sinir Hastalıkları Hastanesi"
                  address="Bakırköy, İstanbul"
                  phone="0212 409 15 15"
                  hours="7/24"
                  website="https://bakirkoyruhsinir.saglik.gov.tr/"
                />
                
                <CenterCard
                  name="Erenköy Ruh ve Sinir Hastalıkları Hastanesi"
                  address="Kadıköy, İstanbul"
                  phone="0216 302 59 59"
                  hours="7/24"
                  website="https://erenkoyrshhast.saglik.gov.tr/"
                />
                
                <CenterCard
                  name="Manisa Ruh Sağlığı ve Hastalıkları Hastanesi"
                  address="Manisa"
                  phone="0236 238 24 10"
                  hours="7/24"
                  website="https://manisaruh.saglik.gov.tr/"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CenterCard = ({ name, address, phone, hours, website }: { 
  name: string;
  address: string;
  phone: string;
  hours: string;
  website: string;
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h3 className="font-medium">{name}</h3>
      <div className="flex items-start gap-2 text-sm">
        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
        <span>{address}</span>
      </div>
      <div className="flex items-start gap-2 text-sm">
        <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
        <span>{phone}</span>
      </div>
      <div className="flex items-start gap-2 text-sm">
        <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
        <span>{hours}</span>
      </div>
      <Button variant="link" className="px-0 h-auto" asChild>
        <a href={website} target="_blank" rel="noopener noreferrer">
          Websitesini Ziyaret Et
        </a>
      </Button>
    </div>
  );
};

export default EmergencyHelp;
