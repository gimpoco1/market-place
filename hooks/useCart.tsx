import { CartProduct } from "@/app/product/[productId]/ProductDetails";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import {toast} from "react-hot-toast";

type CartContextType = {
	cartProducts: CartProduct[] | null;
	handleAddProductToCart: (product: CartProduct) => void;
	handleRemoveProductFromCart: (product: CartProduct) => void;
	handleCartQtyIncrease: (product: CartProduct) => void;
	handleCartQtyDecrease: (product: CartProduct) => void;
	handleClearCart: () => void;
	cartTotalQty: number;
	cartTotalAmount: number;
	paymentIntent: string | null;
	handleSetPaymentIntent: (val: string | null) => void;
  };

export const CartContext = createContext<CartContextType | null>(null);

export interface Props {
	[propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
	const [cartTotalQty, setCartTotalQty] = useState(0);
	const [cartTotalAmount, setCartTotalAmount] = useState(0);
	const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(
		null
	);
	const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

	useEffect(() => {
		const cartItems = localStorage.getItem("TIcartItems");
		const cProducts: CartProduct[] | null = JSON.parse(cartItems!);
		const eShopPaymentIntent: any= localStorage.getItem("eShopPaymentIntent");
		const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

		setCartProducts(cProducts);
		setPaymentIntent(paymentIntent);
	}, []);

	useEffect(() => {
		const getTotals = () => {
		  if (cartProducts) {
			const { total, qty } = cartProducts.reduce(
			  (acc, item) => {
				const itemTotal = item.price * item.quantity;
	
				acc.total += itemTotal;
				acc.qty += item.quantity;
	
				return acc;
			  },
			  {
				total: 0,
				qty: 0,
			  }
			);
	
			setCartTotalAmount(parseFloat(total.toFixed(2)));
			setCartTotalQty(qty);
		  }
		};
	
		getTotals();
	  }, [cartProducts]);

	const handleAddProductToCart = useCallback((product: CartProduct) => {
		setCartProducts((prev) => {
		  let updatedCart;
		  if (prev) {
			updatedCart = [...prev, product];
		  } else {
			updatedCart = [product];
		  }
		  localStorage.setItem("TIcartItems", JSON.stringify(updatedCart));
		  return updatedCart;
		});
		 
		toast.success('Product added to cart'); 
	  }, []);
	  

	const handleRemoveProductFromCart = useCallback(
		(product: CartProduct) => {
			if (cartProducts) {
				const filteredProducts = cartProducts?.filter((item) => {
					return item.id !== product.id;
				});
				setCartProducts(filteredProducts);
				localStorage.setItem("TIcartItems", JSON.stringify(filteredProducts));
				toast.success("Product removed");
			}
		},
		[cartProducts]
	);

	const handleCartQtyIncrease = useCallback(
		(product: CartProduct) => {
			let updatedCart;
			if (product.quantity === 99) {
				return toast.error("Maximum quantity reached");
			}

			if (cartProducts) {
				
				const existingIndex = cartProducts.findIndex(
					(item) => item.id === product.id
					);
					updatedCart = [...cartProducts];

				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity =
						updatedCart[existingIndex].quantity + 1;
				}
				setCartProducts(updatedCart);
				localStorage.setItem("TIcartItems", JSON.stringify(updatedCart));
			}
		},
		[cartProducts]
	);
	const handleCartQtyDecrease = useCallback(
		(product: CartProduct) => {
			let updatedCart;
			if (product.quantity === 1) {
				return toast.error("Minimum reached");
			}

			if (cartProducts) {
				
				const existingIndex = cartProducts.findIndex(
					(item) => item.id === product.id
					);
					updatedCart = [...cartProducts];

				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity =
						updatedCart[existingIndex].quantity - 1;
				}
				setCartProducts(updatedCart);
				localStorage.setItem("TIcartItems", JSON.stringify(updatedCart));
			}
		},
		[cartProducts]
	);

	const handleClearCart = useCallback(() => {
		setCartProducts(null);
		setCartTotalQty(0);
		localStorage.setItem("TIcartItems", JSON.stringify(null));
	}, [cartProducts]);

	const handleSetPaymentIntent = useCallback((value: string | null) => {
		setPaymentIntent(value);
		localStorage.setItem("eShopPaymentIntent", JSON.stringify(value));
	}, [paymentIntent])

	const value = {
		cartProducts,
		handleAddProductToCart,
		handleRemoveProductFromCart,
		handleCartQtyIncrease,
		handleCartQtyDecrease,
		handleClearCart,
		cartTotalQty,
		cartTotalAmount,
		paymentIntent,
		handleSetPaymentIntent,
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
