
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateEventDialogProps {
  groupName: string;
  onEventCreated: (event: { id: string; title: string; date: string; description: string; attendees: number }) => void;
}

export const CreateEventDialog = ({ groupName, onEventCreated }: CreateEventDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !date.trim() || !description.trim()) return;
    
    const newEvent = {
      id: Date.now().toString(),
      title,
      date,
      description,
      attendees: 1 // Creator is the first attendee
    };
    
    onEventCreated(newEvent);
    
    toast({
      title: "Etkinlik oluşturuldu",
      description: `"${title}" etkinliği ${groupName} grubunda başarıyla oluşturuldu.`,
    });
    
    setTitle("");
    setDate("");
    setDescription("");
    setOpen(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.toLocaleDateString('tr-TR')} ${date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <CalendarPlus className="mr-2 h-4 w-4" />
          Etkinlik Oluştur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Etkinlik Oluştur</DialogTitle>
            <DialogDescription>
              {groupName} topluluğu için yeni bir etkinlik oluşturun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Etkinlik Başlığı</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Etkinlik başlığını girin"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Tarih ve Saat</Label>
              <Input
                id="date"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              {date && (
                <p className="text-xs text-muted-foreground">
                  {formatDate(date)}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Etkinliğin içeriği ve amacı hakkında bilgi verin"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!title.trim() || !date.trim() || !description.trim()}>
              Etkinlik Oluştur
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
