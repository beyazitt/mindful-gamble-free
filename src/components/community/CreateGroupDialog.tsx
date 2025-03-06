
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateGroupDialogProps {
  onGroupCreated: (group: { id: string; name: string; description: string; memberCount: number }) => void;
}

export const CreateGroupDialog = ({ onGroupCreated }: CreateGroupDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim()) return;
    
    const newGroup = {
      id: Date.now().toString(),
      name,
      description,
      memberCount: 1 // Creator is the first member
    };
    
    onGroupCreated(newGroup);
    
    toast({
      title: "Grup oluşturuldu",
      description: `"${name}" grubu başarıyla oluşturuldu.`,
    });
    
    setName("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Yeni Topluluk Oluştur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Yeni Topluluk Oluştur</DialogTitle>
            <DialogDescription>
              Ortak ilgi ve hedefleri olan kişilerle bağlantı kurmak için yeni bir grup oluşturun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Topluluk Adı</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Topluluğunuza bir isim verin"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Topluluğunuzun amacını ve kimlerin katılabileceğini belirtin"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!name.trim() || !description.trim()}>
              Topluluk Oluştur
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
