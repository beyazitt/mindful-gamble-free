
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface GroupCardProps {
  name: string;
  memberCount: number;
  description: string;
  onClick?: () => void;
}

export const GroupCard = ({ name, memberCount, description, onClick }: GroupCardProps) => {
  const { toast } = useToast();
  const [joined, setJoined] = useState(false);
  
  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click event
    setJoined(!joined);
    
    toast({
      title: joined ? "Topluluktan ayrıldınız" : "Topluluğa katıldınız",
      description: joined 
        ? `${name} topluluğundan başarıyla ayrıldınız.` 
        : `${name} topluluğuna başarıyla katıldınız.`,
    });
  };
  
  return (
    <Card className={onClick ? "transition-all hover:shadow-md" : ""} onClick={onClick}>
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
