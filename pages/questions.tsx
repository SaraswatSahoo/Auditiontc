import { useRouter } from "next/router";
import React, { useState } from "react";
import { toastError, toastSuccess } from "../utils/toast";
import { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";
import axios from "axios";

export default function Questions() {
  const inputClassName =
    "focus:outline-none border-2 border-gray-200 px-4 py-2 mt-2 focus:border-blue-500 rounded-xl w-full";

  const titleClassName = "mt-2";
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const numberOfQuestions = Number(process.env.NEXT_PUBLIC_NUMBER_OF_QUESTION);
  const [answers, setAnswers] = useState<string[]>(
    new Array(numberOfQuestions).fill("")
  );
  return (
    <>
      <form onSubmit={submitHandler} className='mx-5 mt-3'>
        <div>
          Why do you want to join this club?
          <span className='text-red-600'>*</span>
        </div>
        <textarea
          name='0'
          placeholder='Write atleast 100 words'
          className={inputClassName}
          value={answers[0]}
          onChange={changeHandler}
        />
        <div className={titleClassName}>
          How will you contribute to the club?{" "}
          <span className='text-red-600'>*</span>
        </div>
        <textarea
          name='1'
          placeholder='Write atleast 100 words'
          className={inputClassName}
          value={answers[1]}
          onChange={changeHandler}
        />
        <div className={titleClassName}>
          Why did you choose this role? <span className='text-red-600'>*</span>
        </div>
        <textarea
          name='2'
          placeholder='Write atleast 100 words'
          className={inputClassName}
          value={answers[2]}
          onChange={changeHandler}
        />
        <button
          type='submit'
          className='bg-blue-600 text-white p-3 rounded-xl m-3'
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </>
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
      if (answers.some((str) => str.trim().length === 0)) {
        throw new Error("Fill all fields properly");
      }
      setloading(true);
      await axios.put("/api/questions", { answers });
      toastSuccess("Thanks for answering the questions");
      router.push("/rating");
    } catch (error) {
      toastError("Invalid answers");
    }
    setloading(false);
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
