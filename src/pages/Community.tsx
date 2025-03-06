
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, Calendar } from "lucide-react";
import { GroupCard } from "@/components/community/GroupCard";
import { EventCard } from "@/components/community/EventCard";
import { PostCard } from "@/components/community/PostCard";
import { PostCreationCard } from "@/components/community/PostCreationCard";
import { CreateGroupDialog } from "@/components/community/CreateGroupDialog";
import { CreateEventDialog } from "@/components/community/CreateEventDialog";

// Sample data
const initialPosts = [
  {
    id: '1',
    author: { name: 'Can A.', initials: 'CA' },
    timeAgo: '3 gün önce',
    content: '1 ay önce kumarsız yaşamaya başladım ve şimdiden hayatımda büyük bir değişim görüyorum. Artık daha fazla zamanım var ve mali durumum iyileşiyor. Bazen zorlanıyorum ama bu topluluk sayesinde her gün daha da güçleniyorum. Herkese desteği için teşekkür ederim! 💪',
    likes: 48,
    comments: 12
  },
  {
    id: '2',
    author: { name: 'Esra S.', initials: 'ES' },
    timeAgo: '5 gün önce',
    content: 'Bugün kumar oynamamın tetikleyicilerini fark ettim - genellikle stresli olduğumda veya kendimi yalnız hissettiğimde başlıyor. Şimdi bu duygular geldiğinde yürüyüşe çıkmayı veya bir arkadaşımı aramayı deniyorum. Bazen işe yarıyor, bazen yaramıyor ama en azından farkındalık kazandım.',
    likes: 36,
    comments: 8
  }
];

const initialGroups = [
  {
    id: '1',
    name: "Yeni Başlayanlar",
    memberCount: 156,
    description: "Kumar bağımlılığını yeni fark edip değişim için adım atmak isteyenler için destek grubu."
  },
  {
    id: '2',
    name: "İyileşme Yolculuğu",
    memberCount: 98,
    description: "Kumar bağımlılığından kurtulma sürecindeki kişiler için motivasyon ve destek grubu."
  },
  {
    id: '3',
    name: "Aile Desteği",
    memberCount: 73,
    description: "Kumar bağımlısı olan yakınlarına destek olmak isteyen aile üyeleri için."
  },
  {
    id: '4',
    name: "Mali İyileşme",
    memberCount: 122,
    description: "Kumar nedeniyle oluşan mali sorunları aşma stratejileri geliştirme grubu."
  }
];

const initialEvents = [
  {
    id: '1',
    title: "Çevrimiçi Destek Toplantısı",
    date: "12 Haziran 2023, 19:00",
    attendees: 28,
    description: "Kumar davranışını kontrol etmede pratik stratejiler konulu haftalık destek toplantısı."
  },
  {
    id: '2',
    title: "Mali Planlama Atölyesi",
    date: "18 Haziran 2023, 15:00",
    attendees: 42,
    description: "Kumar kaynaklı borçları yönetme ve mali düzen kurma hakkında interaktif çalıştay."
  }
];

// Group-Event mapping
const initialGroupEvents: Record<string, typeof initialEvents> = {
  '1': [
    {
      id: '101',
      title: "Tanışma Toplantısı",
      date: "14 Haziran 2023, 18:00",
      attendees: 15,
      description: "Yeni üyeler için tanışma ve deneyim paylaşımı toplantısı."
    }
  ],
  '2': [
    {
      id: '201',
      title: "Haftalık İlerleme Paylaşımı",
      date: "16 Haziran 2023, 20:00",
      attendees: 22,
      description: "Herkesin haftalık ilerlemesini ve zorluklarını paylaşabileceği bir buluşma."
    }
  ]
};

const Community = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [groups, setGroups] = useState(initialGroups);
  const [events, setEvents] = useState(initialEvents);
  const [groupEvents, setGroupEvents] = useState<Record<string, typeof initialEvents>>(initialGroupEvents);
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleCreatePost = (post: { content: string }) => {
    const newPost = {
      id: Date.now().toString(),
      author: { name: 'Kullanıcı', initials: 'K' },
      timeAgo: 'Az önce',
      content: post.content,
      likes: 0,
      comments: 0
    };
    
    setPosts([newPost, ...posts]);
  };

  const handleCreateGroup = (group: { id: string; name: string; description: string; memberCount: number }) => {
    setGroups([...groups, group]);
    // Initialize empty events array for this group
    setGroupEvents({
      ...groupEvents,
      [group.id]: []
    });
  };

  const handleCreateEvent = (groupId: string, event: { id: string; title: string; date: string; description: string; attendees: number }) => {
    if (groupId) {
      // Add to specific group's events
      setGroupEvents({
        ...groupEvents,
        [groupId]: [...(groupEvents[groupId] || []), event]
      });
    } else {
      // Add to general events
      setEvents([...events, event]);
    }
  };

  const getSelectedGroupName = () => {
    if (!selectedGroup) return "";
    const group = groups.find(g => g.id === selectedGroup);
    return group ? group.name : "";
  };

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">Topluluk</h1>
      <p className="text-muted-foreground">Benzer zorluklarla mücadele eden kişilerle bağlantı kurun, deneyimleri paylaşın ve destek alın.</p>
      
      <div className="flex justify-between items-center">
        <Tabs 
          defaultValue="posts" 
          className="w-full"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            if (value !== "groups") {
              setSelectedGroup(null);
            }
          }}
        >
          <TabsList>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Paylaşımlar</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Topluluklar</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Etkinlikler</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-6 space-y-4">
            <PostCreationCard onPostCreated={handleCreatePost} />
            
            {posts.map(post => (
              <PostCard
                key={post.id}
                author={post.author}
                timeAgo={post.timeAgo}
                content={post.content}
                likes={post.likes}
                comments={post.comments}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="groups" className="mt-6">
            {!selectedGroup ? (
              <>
                <div className="mb-4">
                  <CreateGroupDialog onGroupCreated={handleCreateGroup} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {groups.map(group => (
                    <div key={group.id} onClick={() => setSelectedGroup(group.id)} className="cursor-pointer">
                      <GroupCard
                        name={group.name}
                        memberCount={group.memberCount}
                        description={group.description}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">{getSelectedGroupName()}</h2>
                  <div className="flex gap-2">
                    <CreateEventDialog 
                      groupName={getSelectedGroupName()}
                      onEventCreated={(event) => handleCreateEvent(selectedGroup, event)} 
                    />
                    <Button variant="outline" size="sm" onClick={() => setSelectedGroup(null)}>
                      Geri Dön
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Topluluk Etkinlikleri</h3>
                  {groupEvents[selectedGroup]?.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {groupEvents[selectedGroup].map(event => (
                        <EventCard
                          key={event.id}
                          title={event.title}
                          date={event.date}
                          attendees={event.attendees}
                          description={event.description}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Bu toplulukta henüz etkinlik yok. İlk etkinliği siz oluşturun!</p>
                  )}
                  
                  <h3 className="text-xl font-medium mt-8">Paylaşımlar</h3>
                  <PostCreationCard onPostCreated={handleCreatePost} />
                  {posts.slice(0, 2).map(post => (
                    <PostCard
                      key={post.id}
                      author={post.author}
                      timeAgo={post.timeAgo}
                      content={post.content}
                      likes={post.likes}
                      comments={post.comments}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="events" className="mt-6">
            <div className="mb-4">
              <CreateEventDialog 
                groupName="Genel"
                onEventCreated={(event) => handleCreateEvent("", event)} 
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {events.map(event => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  attendees={event.attendees}
                  description={event.description}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Card className="rounded-lg border p-4">
        <h3 className="font-medium mb-2">Topluluk Kuralları</h3>
        <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
          <li>Diğer üyelere saygılı ve destekleyici olun</li>
          <li>Gizliliği koruyun ve başkalarının özel bilgilerini paylaşmayın</li>
          <li>Sağlık tavsiyesi vermekten kaçının, profesyonel yardım önerileri için kaynaklar bölümünü kullanın</li>
          <li>Kumar oynama yöntemleri, stratejileri veya fırsatları hakkında içerik paylaşmayın</li>
          <li>Yeni başlayanlara karşı anlayışlı olun ve destekleyici bir ortam yaratın</li>
        </ul>
      </Card>
    </div>
  );
};

export default Community;
