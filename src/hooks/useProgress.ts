
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from '@/hooks/use-toast';

export const useProgress = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: progress, isLoading } = useQuery({
    queryKey: ['progress', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('email_session_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (xpGained: number) => {
      if (!user?.id) throw new Error('User not authenticated');

      // Use direct database update instead of RPC for now
      const currentProgress = progress || { total_xp: 0, current_level: 1, current_streak: 0, longest_streak: 0 };
      const newTotalXp = currentProgress.total_xp + xpGained;
      const newLevel = Math.floor(newTotalXp / 1000) + 1;

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          email_session_id: user.id,
          total_xp: newTotalXp,
          current_level: newLevel,
          current_streak: currentProgress.current_streak,
          longest_streak: currentProgress.longest_streak,
          last_activity_date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress', user?.id] });
      toast({
        title: 'Progress Updated!',
        description: 'You earned XP and your progress has been updated.',
      });
    },
    onError: (error) => {
      console.error('Error updating progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to update progress. Please try again.',
        variant: 'destructive',
      });
    },
  });

  return {
    progress,
    isLoading,
    updateProgress: updateProgressMutation.mutate,
    isUpdating: updateProgressMutation.isPending,
  };
};
