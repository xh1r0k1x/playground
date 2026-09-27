// --- Local Types ---
import type { LanguageContent } from '@/types/language';

// --- Others ---
import { useQuery } from '@tanstack/react-query';

export const useLanguageContent = () => {
  return useQuery<LanguageContent>({
    queryKey: ['language'],
    queryFn: async () => {
      const response = await fetch('/api/get-language');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
};
