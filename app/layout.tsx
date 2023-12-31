import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "../actions/getCurrentUser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "Treasure Island",
	description: "E-COMMERCE APP",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	const currentUser = await getCurrentUser();


	return (
		<html lang="en">
			<body className={`${poppins.className}text-slate-700`}>
				<Toaster
					toastOptions={{
						style: {
							background: "rgb(51 65 85)",
							color: "#fff",
						},
					}}
				/>
				<CartProvider>
					<div className="flex flex-col min-h-screen ">
						<Navbar currentUser={currentUser}/>
						<main className="flex-grow">{children}</main>
						<Footer />
					</div>
				</CartProvider>
			</body>
		</html>
	);
}
