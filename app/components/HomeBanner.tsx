"use client";

import Slider from "react-slick";
import bannersix from "@/public/bannersix.jpg";
import bannerseven from "@/public/bannerseven.jpg";
import bannereight from "@/public/bannereight.jpg";

import bannerten from "@/public/bannerten.jpeg";
import Image from "next/image";
import BannerText from "./BannerText";

const HomeBanner = () => {
	var settings = {
		dots: false,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3500,
	};

	return (
		<div className="relative">
			<Slider {...settings}>
				<div className="w-full h-full relative">
					<Image
						src={bannersix}
						alt="bannersix"
						className="w-full h-full relative"
						priority
					/>
					<BannerText
						title="Electronics & Home Sale"
						description="Save up to 50%"
					/>
				</div>
				<div className="w-full h-full relative">
					<Image
						src={bannereight}
						alt="bannereight"
						className="w-full h-full relative"
					/>
					{/* <BannerText title="New Trends, Low Prices" description="Big Discounts & Best Choices" /> */}
				</div>
				<div className="w-full h-full relative">
					<Image
						src={bannerseven}
						alt="bannerseven"
						className="w-full h-full relative"
						priority
					/>
					<BannerText
						title="Must-have Styles"
						description="AT INCREDIBLY LOW PRICES"
					/>
				</div>

				<div className="w-full h-full relative">
					<Image
						src={bannerten}
						alt="bannerten"
						className="w-full h-full relative"
					/>
					{/* <BannerText title="New Trends, Low Prices" description="Big Discounts & Best Choices" /> */}
				</div>
			</Slider>
			<div className="absolute w-full h-20 bg-gradient-to-t from-white to-transparent bottom-0 left-0" />
		</div>
	);
};

export default HomeBanner;
