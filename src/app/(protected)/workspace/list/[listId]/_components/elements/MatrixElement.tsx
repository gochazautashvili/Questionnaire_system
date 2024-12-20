interface MatrixElementProps {
  value: string;
}

const MatrixElement = ({ value }: MatrixElementProps) => {
  return <div>{value}</div>;
};

export default MatrixElement;
