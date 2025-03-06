
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface PostCardProps {
  author: {
    name: string;
    initials: string;
  };
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
}

export const PostCard = ({ author, timeAgo, content, likes: initialLikes, comments: initialComments }: PostCardProps) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };
  
  const handleComment = () => {
    if (!commentText.trim()) return;
    
    setComments(comments + 1);
    setCommentText("");
    setShowCommentDialog(false);
    
    toast({
      title: "Yorum gönderildi",
      description: "Yorumunuz başarıyla eklendi.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Paylaşıldı",
      description: "Bu gönderi başarıyla paylaşıldı.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>{author.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="text-xs text-muted-foreground">{timeAgo}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex gap-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex gap-2 ${liked ? "text-primary" : ""}`}
            onClick={handleLike}
          >
            <ThumbsUp className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span>{likes}</span>
          </Button>
          
          <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="flex gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{comments}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yorum Yap</DialogTitle>
                <DialogDescription>
                  Bu gönderiye yorum yazın. Saygılı ve yapıcı olun.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea 
                  placeholder="Yorumunuzu buraya yazın..." 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCommentDialog(false)}>
                    İptal
                  </Button>
                  <Button onClick={handleComment} disabled={!commentText.trim()}>
                    Gönder
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Button variant="ghost" size="sm" className="flex gap-2" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          <span>Paylaş</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
