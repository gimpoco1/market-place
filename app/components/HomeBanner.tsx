import Image from "next/image";

const HomeBanner = () => {
	return (
		<div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
			<div className="mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-evenly">
				<div className="text-center md:mb-0 md:w-2/3">
					<h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
						Winter Sale
					</h1>
					<p className="text-lg md:text-xl text-white mb-2">
						Enjoy discounts on selected items
					</p>
					<p className="text-2xl md:text-5xl text-yellow-400 font-bold">
						get 50% OFF
					</p>
				</div>
				<div className="w-full md:w-1/3 relative aspect-video">
					<Image
						src="/banner-image.png"
						fill
						priority
						sizes="100%"
						alt="Banner Image"
						className="object-contain"
					/>
				</div>
			</div>
		</div>
	);
};

export default HomeBanner;
