import React, { useState } from "react";
import { Item } from "../Types/Cart.types";
import { updateCartItem, removeCartItem } from "../store/cartSlice";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";


interface ItemsTableProps {
  intialItems: Item[];
}

const Table: React.FC<ItemsTableProps> = ({ intialItems }) => {
  const [items, setItems] = useState(intialItems);
  const dispatch = useDispatch<AppDispatch>();
  const token = JSON.parse(localStorage.getItem("token")!);

  const handleQuantityChange = async (index: number, newQty: number) => {
    // console.log("fahad");
    
    if (newQty < 1) return; // prevent zero/negative quantities

    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const price = item.product?.price ?? 0;
        return {
          ...item,
          quantity: newQty,
          totalPrice: price * newQty,
        };
      }
      return item;
    });

    setItems(updatedItems);

    await dispatch(
      updateCartItem({
        token,
        itemId: updatedItems[index]._id,
        quantity: newQty,
      })
    );
  };

  const handleRemoveItem = async(itemId:string)=>{
    // console.log("fahad");
    setItems(prevItems =>
      prevItems.filter(item => item._id !== itemId)
    );
    dispatch(removeCartItem({token,itemId}))
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-8">
        <thead>
          <tr className="bg-white shadow-md text-left">
            <th className=" px-8 py-4 font-medium">Product</th>
            <th className=" px-8 py-4 font-medium">Price</th>
            <th className=" px-8 py-4 font-medium">Quantity</th>
            <th className=" px-8 py-4 font-medium">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, idx) => (
              <tr className="bg-white shadow-md" key={item.product.id}>
                {/* Product Image & Name */}
                <td className="px-8 py-4 flex items-center gap-6">
                  <div className="relative w-12 h-10">
                    <img
                      src={item.product.imageUrl}
                      alt="Product"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      onClick={()=>handleRemoveItem(item._id)}
                      className="absolute -top-3 -left-2 text-red-500"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>

                  <span className="font-normal">{item.product.title}</span>
                </td>

                {/* Price */}
                <td className="px-8 py-4">${item.product.price}</td>

                {/* Quantity Input */}
                <td className="px-8 py-4">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(idx, parseInt(e.target.value))
                    }
                    className="w-16 h-12 border border-gray-700 rounded-md text-center"
                  />
                </td>

                {/* Subtotal */}
                <td className="px-8 py-4 font-medium">${item.totalPrice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
