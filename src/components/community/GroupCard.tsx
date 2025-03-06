
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface GroupCardProps {
  name: string;
  memberCount: number;
  description: string;
}

export const GroupCard = ({ name, memberCount, description }: GroupCardProps) => {
  const { toast } = useToast();
  const [joined, setJoined] = useState(false);
  
  const handleJoin = () => {
    setJoined(!joined);
    
    toast({
      title: joined ? "Gruptan ayrıldınız" : "Gruba katıldınız",
      description: joined 
        ? `${name} grubundan başarıyla ayrıldınız.` 
        : `${name} grubuna başarıyla katıldınız.`,
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
        <Button 
          onClick={handleJoin} 
          variant={joined ? "outline" : "default"} 
          className="w-full"
        >
          {joined ? "Ayrıl" : "Katıl"}
        </Button>
      </CardFooter>
    </Card>
  );
};
