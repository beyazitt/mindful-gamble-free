
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface PostCreationCardProps {
  onPostCreated: (post: { content: string }) => void;
}

export const PostCreationCard = ({ onPostCreated }: PostCreationCardProps) => {
  const { toast } = useToast();
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    if (!postContent.trim()) return;
    
    onPostCreated({ content: postContent });
    setPostContent("");
    
    toast({
      title: "Paylaşım gönderildi",
      description: "Paylaşımınız toplulukla paylaşıldı.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Düşüncelerinizi Paylaşın</CardTitle>
        <CardDescription>Deneyimlerinizi, zorluklarınızı ve başarılarınızı toplulukla paylaşın.</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          placeholder="Paylaşmak istediğiniz deneyiminizi yazın..." 
          className="min-h-[120px]"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => setPostContent("")}>İptal</Button>
        <Button onClick={handlePost} disabled={!postContent.trim()}>Paylaş</Button>
      </CardFooter>
    </Card>
  );
};
