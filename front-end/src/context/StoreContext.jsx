import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { food_list as local_food_list } from "../assets/assets";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState(local_food_list);

    const addToCart = useCallback(async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    }, [token, url]);

    const removeFromCart = useCallback(async (itemId) => {
        setCartItems(prev => {
            const newItems = { ...prev };
            if (newItems[itemId] > 1) {
                newItems[itemId] -= 1;
            } else {
                delete newItems[itemId];
            }
            return newItems;
        });
        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    }, [token, url]);

    const getTotalCartAmount = useCallback(() => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }, [cartItems, food_list]);

    const getCartItemCount = useCallback(() => {
        let count = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                count += cartItems[item];
            }
        }
        return count;
    }, [cartItems]);

    const fetchFoodList = useCallback(async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList([...local_food_list, ...response.data]);
        } catch (error) {
            console.log("Error fetching food list:", error);
            setFoodList(local_food_list);
        }
    }, [url]);

    const loadCartData = useCallback(async (tok) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: tok } });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.log("Error loading cart:", error);
        }
    }, [url]);

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [fetchFoodList, loadCartData]);

    const ContextValue = useMemo(() => ({
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getCartItemCount,
        url,
        token,
        setToken
    }), [food_list, cartItems, addToCart, removeFromCart, getTotalCartAmount, getCartItemCount, url, token]);

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
