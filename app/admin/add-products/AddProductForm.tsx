"use client";

import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoriyInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { Categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import SelectColor from "@/app/components/inputs/SelectColor";

export type ImageType = {
	color: string;
	colorCode: string;
	image: File | null;
};
export type UploadedImageType = {
	color: string;
	colorCode: string;
	image: string;
};

const AddProductForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			description: "",
			brand: "",
			price: "",
			inStock: false,
			images: [],
			category: "",
		},
	});

	const category = watch("category");

	const setCustomValue = (id: string, value: any) =>
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});

	return (
		<>
			<Heading title="Add a Product" center />
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			></Input>

			<Input
				id="price"
				label="Price"
				disabled={isLoading}
				register={register}
				errors={errors}
				type="number"
				required
			></Input>
			<Input
				id="brand"
				label="Brand"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			></Input>
			<TextArea
				id="description"
				label="Description"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			></TextArea>
			<CustomCheckbox
				id="inStock"
				register={register}
				label="This product is in stock"
			/>
			<div className="w-full font-medium">
				<div className="mb-2 font-semibold">Select a Category</div>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
					{Categories.map((item) => {
						if (item.label === "All") {
							return null;
						}
						return (
							<div key={item.label} className="col-span">
								<CategoryInput
									onClick={(category) => setCustomValue("category", category)}
									selected={category === item.label}
									label={item.label}
									icon={item.icon}
								/>
							</div>
						);
					})}
				</div>
			</div>
			<div className="w-full flex flex-col flex-wrap gap-4">
				<div>
					<div className="font-bold">
						Select the available product colors and upload their images.
					</div>
					<div className="text-sm">
						You must upload at least one image for each color otherwise your
						color selection will be ignored.
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3">
					{colors.map((item, index) => {
						return (
							<SelectColor
								key={index}
								item={item}
								addImageToState={() => {}}
								removeImageFromState={() => {}}
								isProductCreated={false}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default AddProductForm;
