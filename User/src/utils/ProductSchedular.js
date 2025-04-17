import axios from "axios";
import { Product } from "../models/product.model.js"

export const cronproduct = async () => {
  try {
    const response = await axios.get(
      "http://localhost:13374/api/products?populate=*"
    );
    const data = response.data.data;
    //console.log("Product", data);

    for (const item of data) {
        const existing = await Product.findOne({ documentId: item.documentId });
      
        const formattedProduct = {
          id: item.id,
          documentId: item.documentId,
          name: item.name,
          originalPrice: Number(item.originalPrice),
          rating: item.rating,
          description: item.description,
          discount: item.discount,
          color: item.color,
          size: item.size,
          stock: Number(item.stock),
          brand: item.brand,
          isFeatured: item.isFeatured,
          productUrl: item.productUrl.map(img => `http://localhost:13374${img.url}`),
          isNew: item.isNew,
          review: item.review ? Number(item.review) : 0,
        };
      
        if (!existing) {
          // INSERT NEW
          const newProduct = new Product(formattedProduct);
          await newProduct.save();
          console.log(`🆕 Added new product: ${item.documentId}`);
        } else {
          // CHECK FOR CHANGES
          const fieldsToCompare = ["originalPrice", "stock", "discount", "rating"];
          let isChanged = false;
      
          for (let field of fieldsToCompare) {
            if (existing[field] !== formattedProduct[field]) {
              isChanged = true;
              break;
            }
          }
      
          if (isChanged) {
            await Product.updateOne(
              { documentId: item.documentId },
              { $set: formattedProduct }
            );
            console.log(`🔄 Updated product: ${item.documentId}`);
          } else {
            console.log(`✅ No changes for: ${item.documentId}`);
          }
        }
      }
      
  } catch (err) {
    console.error("Sync error:", err);
  }
};