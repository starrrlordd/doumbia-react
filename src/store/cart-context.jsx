import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const CartContext = createContext({
  cart: [],
  addToCart: (product) => {},
  removeItem: (id) => {},
  increaseCart: (id) => {},
  decreaseCart: (id) => {},
  clearCart: () => {},
  total: () => {},
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  setIsCartOpen: () => {},
});

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async (userId) => {
    const cartRef = collection(db, "users", userId, "cart");
    const snapshot = await getDocs(cartRef);

    console.log(snapshot)

    const cartItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(cartItems);

    setCart(cartItems);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = async (product) => {
    if (!product?.id) return;

    const user = auth.currentUser;

    console.log(user.email);

    if (!user) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
    openCart();

    try {
      const cartRef = doc(db, "users", user.uid, "cart", product.id);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        
        await updateDoc(cartRef, {
          quantity: cartData.quantity + 1,
        })

        
      } else {
        await setDoc(cartRef, {
          userId: user.uid,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Failed to sync cart", error);
    }
  };

  const removeItem = async (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "cart", id));
    fetchCart(user.uid);
  };

  const increaseCart = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    await updateDoc(doc(db, "users", user.uid, "cart", id), {
      quantity: item.quantity + 1,
    })

    fetchCart(user.uid);
  };

  const decreaseCart = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    const item = cart.find((item) => item.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      removeItem(id);
    } else {
      await updateDoc(doc(db, "users", user.uid, "cart", id), {
        quantity: item.quantity - 1,
      }) 

      fetchCart(user.uid);
    }
  };

  const clearCart = async () => {
    setCart([]);

    const user = auth.currentUser;
    if (!user) return;

    const cartRef = collection(db, "users", user.uid, "cart");
    const snapshot = await getDocs(cartRef);

    snapshot.forEach(async (docItem) => {
      await deleteDoc(docItem.ref);
    });

    setCart([]);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchCart(user.uid);
      } else {
        setCart([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeItem,
    increaseCart,
    decreaseCart,
    clearCart,
    total,
    isCartOpen,
    openCart,
    closeCart,
    setIsCartOpen,
    
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
