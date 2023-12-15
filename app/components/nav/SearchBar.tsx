"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { TfiSearch } from "react-icons/tfi";

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
  <form onSubmit={handleSubmit(onSubmit)} className="flex items-center rounded-full border border-black-800 shadow-sm mt-8 bg-white relative ">
    <input
      autoComplete="off"
      type="text"
      {...register("searchTerm")}
      placeholder="Explore Treasure Ireland"
      className="flex-grow py-2 pl-6 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-black-300 focus:border-black"
    />
    <button
      type="submit"
      className="absolute right-0 mr-3 text-black flex items-center justify-center"
    >
      <TfiSearch />
    </button>
  </form>
);
};

export default SearchBar;
