import { CDN_URL } from "../utils/constants";

const CartItemCard = ({ item, handleRemoveItem, handleOrder, isSelected }) => {
  const {
    name,
    description,
    price,
    defaultPrice,
    imageId,
    cloudinaryImageId,
  } = item?.card?.info;
  const itemPrice = price
    ? parseInt(price / 100)
    : parseInt(defaultPrice / 100);
  const itemImage = imageId ? imageId : cloudinaryImageId;
  const itemQuantity = item.quantity;

  return (
    <div className="bg-white shadow-lg my-4 p-4 rounded-lg">
      <div className="flex flex-row justify-between">
        <img src={CDN_URL + itemImage} className="w-14 rounded-lg h-16" />
        <div className="mx-4 flex-1">
          <div className="flex  flex-row justify-between">
            <span className="font-medium text-lg">{name}</span>
            <p className="font-semibold text-gray-600">
              {itemQuantity} x {itemPrice} ₹
            </p>
          </div>
          <div>
            <p className="text-gray-600">{description}</p>
            <div className="flex flex-row gap-10">
              <button
                onClick={() => handleRemoveItem(item)}
                className="w-full my-3 bg-orange-300 py-2 rounded-3xl font-medium"
              >
                Remove from Cart
              </button>

              {isSelected ? (
                <button
                  onClick={() => handleOrder(item)}
                  className="w-full my-3 bg-orange-300 py-2 rounded-3xl font-medium"
                >
                  Remove from Order
                </button>
              ) : (
                <button
                  onClick={() => handleOrder(item)}
                  className="w-full my-3 bg-green-300 py-2 rounded-3xl font-medium"
                >
                  Order Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
