
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EventCardProps {
  title: string;
  date: string;
  attendees: number;
  description: string;
}

export const EventCard = ({ title, date, attendees, description }: EventCardProps) => {
  const { toast } = useToast();
  const [attending, setAttending] = useState(false);
  
  const handleAttend = () => {
    setAttending(!attending);
    
    toast({
      title: attending ? "Etkinlikten ayrıldınız" : "Etkinliğe katılım",
      description: attending 
        ? `${title} etkinliğine katılımınız iptal edildi.` 
        : `${title} etkinliğine katılımınız onaylandı.`,
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
        <div className="mt-2 text-sm text-muted-foreground">{attendees + (attending ? 1 : 0)} kişi katılıyor</div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAttend} 
          variant={attending ? "outline" : "default"} 
          className="w-full"
        >
          {attending ? "Vazgeç" : "Katıl"}
        </Button>
      </CardFooter>
    </Card>
  );
};
