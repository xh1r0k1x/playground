// --- Local Types ---
import type { LanguageContent } from '@/types/language';

// --- Others ---
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useLanguageContent = (excludeId?: number) => {
  return useQuery<LanguageContent>({
    queryKey: ['language', excludeId],
    queryFn: async () => {
      const response = await fetch(
        excludeId
          ? `/api/get-language?excludeId=${excludeId}`
          : '/api/get-language',
      );

      if (!response.ok) {
        throw new Error('Failed to get language content');
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
