const ProgressBar = ({ item }) => {
  return (
    <>
      <progress
        value={75}
        min={item.quantity}
        max={item.sold + item.quantity}
      />
    </>
  );
};

export default ProgressBar;
