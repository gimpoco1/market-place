import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
	AiFillTwitterCircle,
	AiFillInstagram,
	AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
	return (
		<footer className=" bg-custom-color-2 text-slate-200 text-sm mt-16">
			<Container>
				<div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
					<FooterList>
						<h3 className="text-base font-bold mb-2">Shop Categories</h3>
                        <Link href="/?category=CCTV%20Cameras">CCTV Security Cameras</Link>
                        <Link href="/?category=LCD%20Projectors">LCD Projectors</Link>
                        <Link href="/?category=Car%20Accessories">Car accessories</Link>
						<Link href="/?category=Sport%20Watches">Sport Watches</Link>
                        <Link href="/?category=Home%20%26%20Leisure">Home & Leisure</Link>
                        <Link href="/?category=Gift%20Ideas">Gift Ideas</Link>
					</FooterList>
					<FooterList>
						<h3 className="text-base font-bold mb-2">Customer Service</h3>
						<Link href="#">Contact Us</Link>
						<Link href="#">Shipping Policy</Link>
						<Link href="#">Returns & Exchanges</Link>
						<Link href="#">FAQs</Link>
					</FooterList>
					<div className="w-full md:w-1/3 mb-6 md:mb-0">
						<h3 className="text-base font-bold mb-2">About Us</h3>
						<p className="mb-2">
							We have estabilished in Dublin since 2011. Our goal is to deliver
							the best product at the best price. We guarantee our service and
							provide full assistance for any purchase.
						</p>
						<p>
							&copy; {new Date().getFullYear()} Treasure Ireland. All rights
							reserved.
						</p>
					</div>
					<FooterList>
						<h3 className="text-base font-bold mb-2">Follow Us</h3>
						<div className="flex gap-2">
							<Link href="#">
								<MdFacebook size={24} />
							</Link>
							<Link href="#">
								<AiFillTwitterCircle size={24} />
							</Link>
							<Link href="#">
								<AiFillInstagram size={24} />
							</Link>
							<Link href="#">
								<AiFillYoutube size={24} />
							</Link>
						</div>
					</FooterList>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
