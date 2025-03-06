
import { createContext, useContext, useEffect, useState } from "react";

export type UserAssessment = {
  completed: boolean;
  riskLevel: 'low' | 'moderate' | 'high' | null;
  date: string | null;
  score: number | null;
};

export type UserProgress = {
  streakDays: number;
  gambleFreeDays: number;
  lastCheckIn: string | null;
  triggers: string[];
  mood: Record<string, number>;
  savings: number;
};

export type UserGoal = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string | null;
};

export type User = {
  id: string;
  name: string;
  email: string | null;
  avatar: string | null;
  onboarded: boolean;
  assessment: UserAssessment;
  progress: UserProgress;
  goals: UserGoal[];
  motivationalLevel: number;
  emergencyContacts: { name: string; phone: string }[];
  preferredNotificationTime: string | null;
  notifications: boolean;
};

const defaultUser: User = {
  id: '1',
  name: 'Kullanıcı',
  email: null,
  avatar: null,
  onboarded: false,
  assessment: {
    completed: false,
    riskLevel: null,
    date: null,
    score: null
  },
  progress: {
    streakDays: 0,
    gambleFreeDays: 0,
    lastCheckIn: null,
    triggers: [],
    mood: {},
    savings: 0
  },
  goals: [],
  motivationalLevel: 3,
  emergencyContacts: [],
  preferredNotificationTime: null,
  notifications: true
};

type UserContextType = {
  user: User;
  updateUser: (userData: Partial<User>) => void;
  updateAssessment: (assessmentData: Partial<UserAssessment>) => void;
  updateProgress: (progressData: Partial<UserProgress>) => void;
  addGoal: (goal: Omit<UserGoal, "id">) => void;
  updateGoal: (id: string, goalData: Partial<UserGoal>) => void;
  deleteGoal: (id: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const updateAssessment = (assessmentData: Partial<UserAssessment>) => {
    setUser(prev => ({
      ...prev,
      assessment: { ...prev.assessment, ...assessmentData }
    }));
  };

  const updateProgress = (progressData: Partial<UserProgress>) => {
    setUser(prev => ({
      ...prev,
      progress: { ...prev.progress, ...progressData }
    }));
  };

  const addGoal = (goal: Omit<UserGoal, "id">) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString()
    };
    setUser(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const updateGoal = (id: string, goalData: Partial<UserGoal>) => {
    setUser(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === id ? { ...goal, ...goalData } : goal
      )
    }));
  };

  const deleteGoal = (id: string) => {
    setUser(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== id)
    }));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      updateUser, 
      updateAssessment, 
      updateProgress, 
      addGoal, 
      updateGoal, 
      deleteGoal,
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
