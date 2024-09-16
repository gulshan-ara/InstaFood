const ResCategory = ({ data }) => {
  return (
    <div className="flex justify-between w-6/12 mx-auto my-8 bg-gray-100 px-4 py-2 shadow-md rounded-lg">
      <span className="font-semibold text-lg">{data.title} ({data.itemCards.length})</span>
      <span className="font-semibold text-lg">v</span>
    </div>
  );
};

export default ResCategory;
