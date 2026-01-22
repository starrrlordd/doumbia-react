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
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const [cart, setCart] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async (userId) => {
    const cartRef = collection(db, "users", userId, "cart");
    const snapshot = await getDocs(cartRef);

    const cartItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCart(cartItems);
  };

  const addToCart = async (product) => {
    if (!product?.id) return;

    const user = auth.currentUser;

    if (!user) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);

        let updatedCart;
        if (existingItem) {
          updatedCart = prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...prevCart, { ...product, quantity: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
      openCart();
      return;
    }

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
        });
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

  const syncLocalCartWithFirestore = async (userId) => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(localCart.length);


    try {
      for (const item of localCart) {
        const cartRef = doc(db, "users", userId, "cart", item.id);
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          const existing = cartSnap.data();

          await updateDoc(cartRef, {
            quantity: existing.quantity + item.quantity,
          });
        } else {
          await setDoc(cartRef, {
            userId,
            productId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            createdAt: new Date(),
          });
        }
      }
      localStorage.removeItem("cart");

      fetchCart(userId);
    } catch (error) {
      console.error("Failed to sync local cart: ", error);
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
    });

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
      });

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
        syncLocalCartWithFirestore(user.uid);
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(localCart);
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
