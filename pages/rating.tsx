import { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";
import { useState } from "react";
import { toastError, toastSuccess } from "../utils/toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Rating() {
  const [rating, setRating] = useState("1");
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <label
          htmlFor='minmax-range'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Min-max range
        </label>
        <input
          id='minmax-range'
          type='range'
          min='1'
          max='10'
          value={rating}
          onChange={handleChange}
          className='w-40 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <div>{rating}</div>
        <button
          disabled={loading}
          onClick={submitHandler}
          className='bg-blue-600 text-white p-3 rounded-xl m-3'
        >
          Submit
        </button>
      </div>
    </>
  );
  async function submitHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setloading(true);
      await axios.put("/api/rating", { rating });
      toastSuccess("Rating submitted");
      router.push("/thankyou");
    } catch (error: any) {
      toastError("Invalid rating");
    }
    setloading(false);
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
