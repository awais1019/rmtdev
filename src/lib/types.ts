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


export type JobItemDescription=JobItem & {
  description:string;
  qualifications:string[];
  reviews:Array<string>;
  duration:string;
  location:string;
  coverImgURL:string;
  companyURl:string;
  salary:string;

}
export type SortBy="relevant" | "recent"
export type PageDirection="previous" | "next"