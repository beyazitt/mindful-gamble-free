
import { useState } from "react";
import { useUser } from "@/providers/user-provider";
import { useToast } from "@/hooks/use-toast";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Plus, Save } from "lucide-react";

const Settings = () => {
  const { user, updateUser, logout } = useUser();
  const { toast } = useToast();
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || "");
  const [notifications, setNotifications] = useState(user.notifications);
  const [notificationTime, setNotificationTime] = useState(user.preferredNotificationTime || "");
  const [contacts, setContacts] = useState<{ name: string; phone: string }[]>(
    user.emergencyContacts || []
  );
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  const handleSaveProfile = () => {
    updateUser({
      name,
      email: email || null,
    });
    
    toast({
      title: "Profil güncellendi",
      description: "Profil bilgileriniz başarıyla kaydedildi.",
    });
  };

  const handleSavePreferences = () => {
    updateUser({
      notifications,
      preferredNotificationTime: notificationTime || null,
    });
    
    toast({
      title: "Tercihler güncellendi",
      description: "Bildirim tercihleriniz başarıyla kaydedildi.",
    });
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      updateUser({
        emergencyContacts: updatedContacts,
      });
      setNewContact({ name: "", phone: "" });
      
      toast({
        title: "Kişi eklendi",
        description: "Acil durum kişisi başarıyla eklendi.",
      });
    }
  };

  const handleRemoveContact = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    updateUser({
      emergencyContacts: updatedContacts,
    });
    
    toast({
      title: "Kişi silindi",
      description: "Acil durum kişisi başarıyla silindi.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Çıkış yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ayarlar</h1>
        <ModeToggle />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Profil Bilgileri</CardTitle>
          <CardDescription>Kişisel bilgilerinizi güncelleyin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">İsim</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveProfile} className="flex gap-2">
            <Save className="h-4 w-4" />
            Kaydet
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Bildirim Tercihleri</CardTitle>
          <CardDescription>Bildirim ayarlarınızı özelleştirin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="cursor-pointer">Bildirimleri etkinleştir</Label>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          
          {notifications && (
            <div className="space-y-2">
              <Label htmlFor="notificationTime">Tercih Edilen Bildirim Saati</Label>
              <Select
                value={notificationTime}
                onValueChange={setNotificationTime}
              >
                <SelectTrigger id="notificationTime">
                  <SelectValue placeholder="Bildirim saati seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="08:00">Sabah (08:00)</SelectItem>
                  <SelectItem value="12:00">Öğle (12:00)</SelectItem>
                  <SelectItem value="18:00">Akşam (18:00)</SelectItem>
                  <SelectItem value="21:00">Gece (21:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSavePreferences} className="flex gap-2">
            <Save className="h-4 w-4" />
            Kaydet
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Acil Durum Kişileri</CardTitle>
          <CardDescription>Zor zamanlarda ulaşabileceğiniz kişileri ekleyin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.phone}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveContact(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Henüz acil durum kişisi eklenmemiş
            </div>
          )}
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="font-medium">Yeni Kişi Ekle</h4>
            <div className="space-y-2">
              <Label htmlFor="contactName">İsim</Label>
              <Input
                id="contactName"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Telefon</Label>
              <Input
                id="contactPhone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setNewContact({ name: "", phone: "" })}
            disabled={!newContact.name && !newContact.phone}
          >
            Temizle
          </Button>
          <Button
            onClick={handleAddContact}
            disabled={!newContact.name || !newContact.phone}
            className="flex gap-2"
          >
            <Plus className="h-4 w-4" />
            Ekle
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Hesap</CardTitle>
          <CardDescription>Hesap ayarlarınızı yönetin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">Çıkış Yap</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Çıkış yapmak istediğinize emin misiniz?</AlertDialogTitle>
                <AlertDialogDescription>
                  Çıkış yaptığınızda, tekrar giriş yapmanız gerekecektir.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Çıkış Yap</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
