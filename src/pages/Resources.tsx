
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, BookOpen, Video, Headphones, Download } from "lucide-react";

const Resources = () => {
  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">Kaynaklar</h1>
      <p className="text-muted-foreground">Kumar bağımlılığını anlamanıza ve aşmanıza yardımcı olacak kaynaklar.</p>
      
      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="articles">Makaleler</TabsTrigger>
          <TabsTrigger value="videos">Videolar</TabsTrigger>
          <TabsTrigger value="podcasts">Podcast'ler</TabsTrigger>
          <TabsTrigger value="tools">Araçlar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Kumar Bağımlılığını Anlamak"
              description="Kumar bağımlılığının psikolojik temelleri ve beyin üzerindeki etkileri."
              link="https://www.yesilay.org.tr/tr/bagimliliklar/kumar-bagimliligi"
            />
            <ResourceCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Kumar Bağımlılığı Tedavisi"
              description="Kumar bağımlılığı tedavisi hakkında bilgiler ve ipuçları."
              link="https://npistanbul.com/kumar-bagimliligi"
            />
            <ResourceCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Bağımlılıkla Başa Çıkma Yöntemleri"
              description="Kumar bağımlılığıyla mücadele etmenin pratik stratejileri."
              link="https://www.memorial.com.tr/saglik-rehberleri/kumar-bagimliligi-nedir-belirtileri-ve-tedavisi-nelerdir"
            />
            <ResourceCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Aileler İçin Kumar Bağımlılığı Rehberi"
              description="Kumar bağımlısı olan bir aile üyesine nasıl yardımcı olunur?"
              link="https://www.psikiyatri.org.tr/halka-yonelik/28/kumar-oyun-bagimliligi"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard 
              icon={<Video className="h-6 w-6" />}
              title="Kumar Bağımlılığını Anlamak"
              description="Dr. Kültegin Ögel ile kumar bağımlılığı üzerine kapsamlı bir röportaj."
              link="https://www.youtube.com/watch?v=5GDxDBSC_GY"
            />
            <ResourceCard 
              icon={<Video className="h-6 w-6" />}
              title="Kumar ve Oyun Bağımlılığı"
              description="Prof. Dr. Nesrin Dilbaz ile kumar bağımlılığı hakkında detaylı bilgiler."
              link="https://www.youtube.com/watch?v=M9waTGQnLTg"
            />
            <ResourceCard 
              icon={<Video className="h-6 w-6" />}
              title="Kumar Bağımlılığından Kurtulmak"
              description="Bağımlılıkla mücadele edip başarılı olan kişilerin hikayeleri."
              link="https://www.youtube.com/watch?v=jtSVu1eoDZk"
            />
            <ResourceCard 
              icon={<Video className="h-6 w-6" />}
              title="Kumar Bağımlılığı Tedavisi"
              description="Dr. Bengi Semerci ile kumar bağımlılığı tedavisi hakkında bilgiler."
              link="https://www.youtube.com/watch?v=KZi1KEDuhR0"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="podcasts" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard 
              icon={<Headphones className="h-6 w-6" />}
              title="Bağımlılık Üzerine"
              description="Psikiyatrist Dr. Aziz Mehmet Gökbakan ile bağımlılık süreçleri hakkında podcast."
              link="https://open.spotify.com/episode/5Ef56jpGtFXIjIlxXNqhKN"
            />
            <ResourceCard 
              icon={<Headphones className="h-6 w-6" />}
              title="Bağımlılıktan Çıkış Yolları"
              description="Psikolojik danışman Gökhan Çınar ile bağımlılıktan kurtulma süreci."
              link="https://open.spotify.com/episode/7hmDkZi7VzjUxMTvhTlcvZ"
            />
            <ResourceCard 
              icon={<Headphones className="h-6 w-6" />}
              title="Kendini Tanıma ve Bağımlılık"
              description="Psikolog Beyhan Budak ile bağımlılık süreçleri ve öz farkındalık."
              link="https://open.spotify.com/episode/5PWPZv4FQmsjKqnDQJZNgj"
            />
            <ResourceCard 
              icon={<Headphones className="h-6 w-6" />}
              title="Dijital Bağımlılık"
              description="Uzman Psikolog Ayşegül Denizci ile çağımızın bağımlılık sorunları."
              link="https://open.spotify.com/episode/5hvHCLWNyA4K6DFuQUiPRp"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard 
              icon={<Download className="h-6 w-6" />}
              title="Günlük Takip Şablonu"
              description="Kumar dürtülerinizi ve tetikleyicilerinizi izlemek için indirilebilir şablon."
              link="https://www.yedam.org.tr/assets/doc/yedam-kumar-kayit-defteri.pdf"
            />
            <ResourceCard 
              icon={<Download className="h-6 w-6" />}
              title="Bütçe Planlayıcısı"
              description="Finansal durumunuzu düzenlemenize yardımcı olacak araç."
              link="https://www.paragaranti.com/finansal-saglik-programi"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Profesyonel Yardım Kaynakları</CardTitle>
          <CardDescription>Aşağıdaki kuruluşlar kumar bağımlılığı konusunda destek sunmaktadır</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border p-4 rounded-lg">
            <h3 className="font-medium">Yeşilay Danışmanlık Merkezi (YEDAM)</h3>
            <p className="text-sm text-muted-foreground mt-1">Bağımlılık tedavisi için ücretsiz danışmanlık ve destek hizmetleri.</p>
            <p className="text-sm mt-2">Telefon: <a href="tel:115" className="text-primary">115</a></p>
            <Button variant="link" className="px-0 mt-2" asChild>
              <a href="https://www.yedam.org.tr/" target="_blank" rel="noopener noreferrer">
                Web Sitesini Ziyaret Et <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="border p-4 rounded-lg">
            <h3 className="font-medium">Adsız Kumarbazlar (GA - Gamblers Anonymous)</h3>
            <p className="text-sm text-muted-foreground mt-1">Kumar bağımlılığından kurtulmak isteyenler için 12 adım programı uygulayan destek grupları.</p>
            <Button variant="link" className="px-0" asChild>
              <a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer">
                Web Sitesini Ziyaret Et <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="border p-4 rounded-lg">
            <h3 className="font-medium">ALO 191 Uyuşturucu ile Mücadele Danışma ve Destek Hattı</h3>
            <p className="text-sm text-muted-foreground mt-1">Sağlık Bakanlığı'nın bağımlılıkla mücadele hattı tüm bağımlılık türlerinde destek vermektedir.</p>
            <p className="text-sm mt-2">Telefon: <a href="tel:191" className="text-primary">191</a></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for resource cards
const ResourceCard = ({ icon, title, description, link }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-x-4 pb-2">
        <div className="mt-1 bg-primary/10 p-2 rounded-md">{icon}</div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Button variant="link" className="px-0 mt-2" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">
            Daha Fazla Oku <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Resources;
