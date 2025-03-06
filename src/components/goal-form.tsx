
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useUser } from "@/providers/user-provider";
import { useToast } from "@/hooks/use-toast";

interface GoalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalToEdit?: {
    id: string;
    title: string;
    description: string;
    dueDate: string | null;
  } | null;
}

export function GoalForm({ open, onOpenChange, goalToEdit = null }: GoalFormProps) {
  const [title, setTitle] = useState(goalToEdit?.title || "");
  const [description, setDescription] = useState(goalToEdit?.description || "");
  const [dueDate, setDueDate] = useState(goalToEdit?.dueDate || "");
  
  const { addGoal, updateGoal } = useUser();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Hedef başlığı gerekli",
        description: "Lütfen hedef için bir başlık belirleyin.",
        variant: "destructive",
      });
      return;
    }

    if (goalToEdit) {
      // Mevcut hedefi güncelle
      updateGoal(goalToEdit.id, {
        title,
        description,
        dueDate: dueDate || null
      });
      toast({
        title: "Hedef güncellendi",
        description: "Hedefleriniz başarıyla güncellendi."
      });
    } else {
      // Yeni hedef ekle
      addGoal({
        title,
        description,
        dueDate: dueDate || null,
        completed: false
      });
      toast({
        title: "Hedef eklendi",
        description: "Yeni hedef başarıyla eklendi."
      });
    }
    
    // Formu temizle ve kapat
    setTitle("");
    setDescription("");
    setDueDate("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{goalToEdit ? "Hedefi Düzenle" : "Yeni Hedef Ekle"}</DialogTitle>
            <DialogDescription>
              {goalToEdit 
                ? "Mevcut hedefi güncelleyin." 
                : "Kumar bağımlılığı ile mücadele için kendinize somut hedefler belirleyin."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Hedef Başlığı</Label>
              <Input
                id="title"
                placeholder="Örn: Hafta içi kumar oynamamak"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama (İsteğe Bağlı)</Label>
              <Textarea
                id="description"
                placeholder="Hedefle ilgili notlarınız..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Bitiş Tarihi (İsteğe Bağlı)</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {goalToEdit ? "Güncelle" : "Hedef Ekle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
