export type JobResponse = {
  jobItems: JobItem[];
};
export type JobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  daysAgo: number;
  relevanceScore: number;
};
