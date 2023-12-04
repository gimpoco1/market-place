import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import Image from "next/image";
import { SafeUser } from "@/types";
import SearchBar from "./SearchBar";


interface NavBarProps {
	currentUser: SafeUser | null;
}

const Navbar: React.FC<NavBarProps> = ({ currentUser }) => {
	return (
		<div className="sticky top-0 w-full bg-custom-color z-30 shadow-sm ">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex item-center justify-between gap-3 md:gap-0">
						<Link href="/">
							<Image
								src="/logo.png"
								width={200}
								height={200}
								priority
								quality={100}
								sizes="100%"
								alt="Treasure Island Logo"
								className="h-30 md:h-30 rounded-md cursor-pointer hover:opacity-80 transition duration-300 ease-in-out"
							/>
						</Link>
						<div className="hidden md:block">
							<SearchBar />
						</div>
						<div className="flex items-center gap-8 md:gap-12">
							<CartCount />
							<UserMenu currentUser={currentUser} />
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default Navbar;
