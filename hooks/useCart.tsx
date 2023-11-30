import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
	cartTotalQty: number;
    cartTotalAmount: number;
	cartProducts: CartProductType[] | null;
	handleAddProductToCart: (product: CartProductType) => void;
	handleRemoveProductFromCart: (product: CartProductType) => void;
	handleCartQtyIncrease: (product: CartProductType) => void;
	handleCartQtyDecrease: (product: CartProductType) => void;
	handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
	[propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
	const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
	const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
		null
	);

	useEffect(() => {
		const cartItems = localStorage.getItem("cartItems");
		const cProducts: CartProductType[] | null = JSON.parse(cartItems!);

		setCartProducts(cProducts);
	}, []);

	useEffect(() => {
		const getTotals = () => {
			if (cartProducts) {
				const { total, quantity } = cartProducts?.reduce(
					(acc, item) => {
						const itemTotal = item.price * item.quantity;

						acc.total += itemTotal;
						acc.quantity += item.quantity;

						return acc;
					},
					{ total: 0, quantity: 0 }
				);
                setCartTotalQty(quantity)
                setCartTotalAmount(total)
			}
		};

		getTotals();
	}, [cartProducts]);

	const handleAddProductToCart = useCallback((product: CartProductType) => {
		setCartProducts((prev) => {
			let updatedCart;
			if (prev) {
				updatedCart = [...prev, product];
			} else {
				updatedCart = [product];
			}
			toast.success("Product added to cart");
			localStorage.setItem("cartItems", JSON.stringify(updatedCart));
			return updatedCart;
		});
	}, []);

	const handleRemoveProductFromCart = useCallback(
		(product: CartProductType) => {
			if (cartProducts) {
				const filteredProducts = cartProducts.filter((item) => {
					return item.id !== product.id;
				});
				setCartProducts(filteredProducts);
				toast.success("Product removed");
				localStorage.setItem("cartItems", JSON.stringify(filteredProducts));
			}
		},
		[cartProducts]
	);

	const handleCartQtyIncrease = useCallback(
		(product: CartProductType) => {
			let updatedCart;
			if (product.quantity === 99) {
				return toast.error("Maximum quantity reached");
			}

			if (cartProducts) {
				updatedCart = [...cartProducts];

				const existingIndex = cartProducts.findIndex(
					(item) => item.id === product.id
				);

				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity =
						updatedCart[existingIndex].quantity + 1;
				}
				setCartProducts(updatedCart);
				localStorage.setItem("cartItems", JSON.stringify(updatedCart));
			}
		},
		[cartProducts]
	);
	const handleCartQtyDecrease = useCallback(
		(product: CartProductType) => {
			let updatedCart;
			if (product.quantity === 1) {
				return toast.error("Minimum  reached");
			}

			if (cartProducts) {
				updatedCart = [...cartProducts];

				const existingIndex = cartProducts.findIndex(
					(item) => item.id === product.id
				);

				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity =
						updatedCart[existingIndex].quantity - 1;
				}
				setCartProducts(updatedCart);
				localStorage.setItem("cartItems", JSON.stringify(updatedCart));
			}
		},
		[cartProducts]
	);

	const handleClearCart = useCallback(() => {
		setCartProducts(null);
		setCartTotalQty(0);
		localStorage.setItem("cartItems", JSON.stringify(null));
	}, [cartProducts]);

	const value = {
		cartTotalQty,
        cartTotalAmount,
		cartProducts,
		handleAddProductToCart,
		handleRemoveProductFromCart,
		handleCartQtyIncrease,
		handleCartQtyDecrease,
		handleClearCart,
	};
	return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
	const context = useContext(CartContext);

	if (context === null) {
		throw new Error("useCart must be used within a CartContextProvider");
	}

	return context;
};