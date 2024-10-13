import ItemList from "./ItemList";

const ResCategory = ({ data, showItem, setExpandedItemIndex }) => {
  // lifting state up and turning it into controlled component
  const handleClick = () => {
    setExpandedItemIndex();
  };

  return (
    <div className="w-6/12 mx-auto my-8 bg-gray-100 px-4 py-2 shadow-md rounded-lg">
      <div className="flex justify-between" onClick={handleClick}>
        <span className="font-semibold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <span className="font-semibold text-lg text-black">⬇</span>
      </div>
      {showItem && <ItemList items={data.itemCards} />}
    </div>
  );
};

export default ResCategory;
