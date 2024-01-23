import type { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";
import React, { useState } from "react";
import { toastError, toastSuccess } from "../utils/toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Layout from "../components/Layout";
import SubmitButton from "../components/SubmitButton";
import { IUser } from "../types/types";
import RangeSlider from "../components/RangeSlider";

export default function Rating() {
  type IFormData = Pick<
    IUser,
    "creativity" | "dedication" | "punctuality" | "hardworking"
  >;
  const [formData, setFormData] = useState<IFormData>({
    creativity: "1",
    hardworking: "1",
    punctuality: "1",
    dedication: "1",
  });
  const [loading, setloading] = useState(false);
  const router = useRouter();

  return (
    <>
      <Layout className='laptop:px-20 laptop:pt-10 pt-4'>
        <form onSubmit={submitHandler} className=''>
          <div className='flex flex-col gap-14'>
            {/* Creativity */}
            <RangeSlider
              changeHandler={changeHandler}
              name='creativity'
              value={formData.creativity!}
            />
            {/* Creativity */}
            <RangeSlider
              changeHandler={changeHandler}
              name='hardworking'
              value={formData.hardworking!}
            />
            {/* punctuality */}
            <RangeSlider
              changeHandler={changeHandler}
              name='punctuality'
              value={formData.punctuality!}
            />
            {/* dedication */}
            <RangeSlider
              changeHandler={changeHandler}
              name='dedication'
              value={formData.dedication!}
            />
          </div>
          <SubmitButton loading={loading} label='Next' />
        </form>
      </Layout>
    </>
  );

  function changeHandler(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setloading(true);
      await axios.put("/api/rating", formData);
      toastSuccess("Rating submitted");
      router.replace("/thankyou");
    } catch (error: any) {
      toastError(error.response.data.message);
    }
    setloading(false);
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
