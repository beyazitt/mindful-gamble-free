
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
              link="#"
            />
            <ResourceCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="İyileşme Yolculuğu: Adım Adım Rehber"
              description="Kumar bağımlılığını aşmanın pratik adımları ve stratejileri."
              link="#"
            />
            <ResourceCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Tetikleyicilerle Başa Çıkma"
              description="Kumar oynama dürtüsünü tetikleyen faktörleri tanıma ve yönetme."
              link="#"
            />
            <ResourceCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Mali Hasarı Onarmak"
              description="Kumar nedeniyle oluşan mali sorunları ele alma stratejileri."
              link="#"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard 
              icon={<Video className="h-6 w-6" />}
              title="Bağımlılık Döngüsünü Kırmak"
              description="Tedavi uzmanlarından kumar bağımlılığını aşma yöntemleri."
              link="#"
            />
            <ResourceCard 
              icon={<Video className="h-6 w-6" />}
              title="İyileşme Hikayeleri"
              description="Kumar bağımlılığını aşmış kişilerin deneyimleri."
              link="#"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="podcasts" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard 
              icon={<Headphones className="h-6 w-6" />}
              title="İyileşme Yolculuğu Podcast"
              description="Kumar bağımlılığından kurtulanların hikayeleri ve uzman görüşleri."
              link="#"
            />
            <ResourceCard 
              icon={<Headphones className="h-6 w-6" />}
              title="Beyin ve Bağımlılık"
              description="Bağımlılık süreçlerinin nörolojik temelleri hakkında bilimsel konuşmalar."
              link="#"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceCard 
              icon={<Download className="h-6 w-6" />}
              title="Günlük Takip Şablonu"
              description="Kumar dürtülerinizi ve tetikleyicilerinizi izlemek için indirilebilir şablon."
              link="#"
            />
            <ResourceCard 
              icon={<Download className="h-6 w-6" />}
              title="Bütçe Planlayıcısı"
              description="Finansal durumunuzu düzenlemenize yardımcı olacak araç."
              link="#"
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
