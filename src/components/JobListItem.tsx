import { JobItem } from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";

type Props = {
  job: JobItem;
  isActive: boolean;
};

export default function JobListItem({ job, isActive }: Props) {
  return (
    <li className={`job-item ${isActive ? "job-item--active" : ""}`}>
      <a href={`#${job.id}`} className="job-item__link">
        <div className="job-item__badge">{job.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{job.title}</h3>
          <p className="job-item__company">{job.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon id={job.id} />
          <time className="job-item__time">{job.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
