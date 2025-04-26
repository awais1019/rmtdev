import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type Props = {
  handlePageChange: (direction: "next" | "previous") => void;
  currentPage: number;
  totalNumOfPages: number;
};

export default function PaginationControls({
  handlePageChange,
  currentPage,
  totalNumOfPages,
}: Props) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          currentPage={currentPage}
          direction="previous"
          onClick={() => handlePageChange("previous")}
        />
      )}
      {currentPage < totalNumOfPages && (
        <PaginationButton
          currentPage={currentPage}
          direction="next"
          onClick={() => handlePageChange("next")}
        />
      )}
    </section>
  );
}
type PaginationButtonProps = {
  direction: "next" | "previous";
  currentPage: number;
  onClick: () => void;
};
function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`pagination__button pagination__button--${direction} `}
    >
      {direction === "next" && (
        <>
          <ArrowRightIcon /> Page {currentPage + 1}
        </>
      )}
      {direction === "previous" && (
        <>
          <ArrowLeftIcon /> Page {currentPage - 1}
        </>
      )}
    </button>
  );
}
