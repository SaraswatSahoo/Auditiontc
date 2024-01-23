import { useRouter } from "next/router";
import React, { useState } from "react";
import { toastError, toastSuccess } from "../utils/toast";
import axios from "axios";
import SubmitButton from "../components/SubmitButton";
import Layout from "../components/Layout";
import type { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";

export default function Questions() {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const numberOfQuestions = Number(process.env.NEXT_PUBLIC_NUMBER_OF_QUESTION);
  const [answers, setAnswers] = useState<string[]>(
    new Array(numberOfQuestions).fill("")
  );
  const titleClassName = "text-white py-2 font-serif laptop:text-2xl";
  const textAreaClassName =
    "focus:outline-none px-4 py-2 mt-2 rounded-xl bg-white bg-opacity-5 text-white inputShadow w-full h-20 placeholder:text-white text-xs placeholder:text-xs laptop:placeholder:text-md";

  return (
    <Layout className='laptop:p-10'>
      <form onSubmit={submitHandler} className='flex flex-col gap-5'>
        <div>
          <div className={titleClassName}>
            Why do you want to join this club?
          </div>
          <textarea
            name='0'
            placeholder='Write atleast 100 words'
            className={textAreaClassName}
            value={answers[0]}
            onChange={changeHandler}
          />
        </div>
        <div>
          <div className={titleClassName}>
            How will you contribute to the club?{" "}
          </div>
          <textarea
            name='1'
            placeholder='Write atleast 100 words'
            className={textAreaClassName}
            value={answers[1]}
            onChange={changeHandler}
          />
        </div>
        <div>
          <div className={titleClassName}>Why did you choose this role? </div>
          <textarea
            name='2'
            placeholder='Write atleast 100 words'
            className={textAreaClassName}
            value={answers[2]}
            onChange={changeHandler}
          />
        </div>
        <SubmitButton
          loading={loading}
          label='Next'
          className='laptop:self-start'
        />
      </form>
    </Layout>
  );
  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[Number(e.target.name)] = e.target.value;
      return newAnswers;
    });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setloading(true);
      await axios.put("/api/questions", { answers });
      toastSuccess("Thanks for answering the questions");
      router.replace("/rating");
    } catch (error: any) {
      toastError(error.response.data.message);
    }
    setloading(false);
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
