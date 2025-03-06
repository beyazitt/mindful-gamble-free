
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/providers/user-provider";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { 
  LayoutDashboard, 
  LineChart, 
  BookOpen, 
  Users,
  MessageSquare,
  AlarmClock,
  Settings,
  LogOut,
  Menu,
  X,
  Dice
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const MainLayout = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Eğer kullanıcı onboarded değilse intro sayfasına yönlendir
    if (!user.onboarded) {
      navigate("/introduction");
    }
    // Değerlendirme yapılmamışsa assessment sayfasına yönlendir
    else if (!user.assessment.completed) {
      navigate("/assessment");
    }
  }, [user, navigate]);

  // Mobil menüyü kapat
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: "Ana Sayfa", href: "/dashboard", icon: LayoutDashboard },
    { name: "İlerlemem", href: "/progress", icon: LineChart },
    { name: "Kaynaklar", href: "/resources", icon: BookOpen },
    { name: "Topluluk", href: "/community", icon: Users },
    { name: "AI Danışman", href: "/ai-advisor", icon: MessageSquare },
    { name: "Acil Yardım", href: "/emergency", icon: AlarmClock },
    { name: "Ayarlar", href: "/settings", icon: Settings },
  ];

  const userInitials = user.name ? user.name.substring(0, 2).toUpperCase() : "KL";

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </>
  );

  if (!user.onboarded || !user.assessment.completed) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop sidebar */}
      <div className="flex flex-1">
        <aside className="hidden md:flex w-64 flex-col border-r px-4 py-6">
          <div className="flex items-center gap-2 mb-6 px-2">
            <div className="flex items-center justify-center gap-1">
              <Dice className="h-5 w-5 text-primary" />
              <Dice className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Kumarı Bırak</h1>
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <NavLinks />
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium truncate">{user.name}</div>
              </div>
              <ModeToggle />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-start"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>Çıkış Yap</span>
            </Button>
          </div>
        </aside>

        {/* Mobile header */}
        <div className="flex flex-col flex-1">
          <header className="md:hidden flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center gap-1">
                <Dice className="h-5 w-5 text-primary" />
                <Dice className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Kumarı Bırak</h1>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 p-4 mb-2 border-b">
                      <div className="flex items-center justify-center gap-1">
                        <Dice className="h-5 w-5 text-primary" />
                        <Dice className="h-5 w-5 text-primary" />
                      </div>
                      <h1 className="text-lg font-bold">Kumarı Bırak</h1>
                    </div>
                    <div className="flex flex-col gap-1 px-2">
                      <NavLinks />
                    </div>
                    <div className="mt-auto px-2 py-4 border-t">
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-muted text-muted-foreground">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium">{user.name}</div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center gap-2 justify-start"
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Çıkış Yap</span>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
