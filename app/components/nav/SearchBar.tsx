"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import qs from "query-string";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  return (
    <div className="flex items-center">
      <input
        autoComplete="on"
        type="text"
        {...register("searchTerm")}
        placeholder="Explore Treasure Island"
        className="p-2
        border
        border-gray-300
        rounded-l-md
        focus:outline-none
        focus:border-[0.5px]
        focus:border-slate-500
        w-80
        mt-8
        "
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="
        bg-slate-700
        hover:opacity-80
        text-white
        p-2
        rounded-r-md
        mt-8

        "
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
