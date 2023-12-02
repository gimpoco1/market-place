import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import  getCurrentUser from "@/actions/getCurrentUser";
import Image from "next/image";

const redressed = Redressed({ subsets: ["latin"], weight: "400" });

const Navbar = async () => {
	const currentUser = await getCurrentUser();

	return (
		<div className="sticky top-0 w-full bg-custom-color z-30 shadow-sm ">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex item-center justify-between gap-3 md:gap-0">
						<Link href="/">
						<Image src="/logo.png"
						width= {150}
						height=  {150}
						sizes="50%"
						alt="Treasure Island Logo"
						className="h-20 md:h-28 rounded-md"
						/>
						</Link>
						<div className="hidden md:block text-white mt-10">Search</div>
						<div className="flex items-center gap-8 md:gap-12">
							<CartCount/>
							<UserMenu currentUser={currentUser}/>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default Navbar;
