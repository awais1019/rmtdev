type Props = {
  totalNumberofResults: number;
};

export default function ResultsCount({ totalNumberofResults }: Props) {
  return (
    <p className="count">
      <span className="u-bold"> {totalNumberofResults}</span> results
    </p>
  );
}
