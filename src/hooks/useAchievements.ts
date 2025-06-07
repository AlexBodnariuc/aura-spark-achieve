
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

export const useAchievements = () => {
  const { user } = useAuth();

  const { data: achievements, isLoading } = useQuery({
    queryKey: ['achievements', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Get all achievements with user's earned status
      const { data, error } = await supabase
        .from('achievements')
        .select(`
          *,
          user_achievements!left (
            earned_at,
            email_session_id
          )
        `);

      if (error) throw error;

      // Transform the data to include earned status
      return data.map(achievement => ({
        ...achievement,
        earned: achievement.user_achievements.some((ua: any) => ua.email_session_id === user.id),
        earned_at: achievement.user_achievements.find((ua: any) => ua.email_session_id === user.id)?.earned_at,
      }));
    },
    enabled: !!user?.id,
  });

  return {
    achievements: achievements || [],
    isLoading,
  };
};
