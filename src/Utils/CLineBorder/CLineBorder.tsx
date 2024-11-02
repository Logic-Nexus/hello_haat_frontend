const CLineBorder = ({ width }: any) => {
  return (
    <hr
      className={`${
        width ? width : "w-[50%]"
      } h-1 bg-warning mb-1 rounded-lg animate-right-bounce`}
    />
  );
};

export default CLineBorder;
