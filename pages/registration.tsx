import { useRouter } from "next/router";
import React, { useState } from "react";
import { toastError, toastSuccess } from "../utils/toast";
import { IUser } from "../types/types";
import { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";
import axios from "axios";

export default function Registration() {
  const inputClassName =
    "focus:outline-none border-2 border-gray-200 px-4 py-2 mt-2 focus:border-blue-500 rounded-xl w-full";
  type IFormData = Pick<IUser, "registrationNum" | "rollNum" | "role">;

  const titleClassName = "mt-2";
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    rollNum: "",
    registrationNum: "",
    role: "",
  });
  return (
    <>
      <form onSubmit={submitHandler} className='mx-5 mt-3'>
        <div className={titleClassName}>
          Registration Number <span className='text-red-600'>*</span>
        </div>
        <input
          type='text'
          name='registrationNum'
          placeholder='Enter Your Registration Number'
          className={inputClassName}
          value={formData.registrationNum}
          onChange={changeHandler}
        />
        <div>
          Roll Number<span className='text-red-600'>*</span>
        </div>
        <input
          type='text'
          name='rollNum'
          placeholder='Enter Roll Number'
          className={inputClassName}
          value={formData.rollNum}
          onChange={changeHandler}
        />
        <div className={titleClassName}>
          Role <span className='text-red-600'>*</span>
        </div>
        <div className='relative'>
          <select
            name='role'
            className={inputClassName}
            value={formData.role}
            onChange={changeHandler}
          >
            <option value='' disabled selected hidden>
              Select a role
            </option>
            <option value='web-developer'>Web Developer</option>
            <option value='event-manager'>Event Manager</option>
            <option value='graphics-designer'>Graphics Designer</option>
            <option value='content-writer'>Content Writer</option>
          </select>
        </div>
        <button
          disabled={loading}
          type='submit'
          className='bg-blue-600 text-white p-3 rounded-xl m-3'
        >
          Submit
        </button>
      </form>
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
    const { registrationNum, role, rollNum } = formData;
    try {
      if (
        !registrationNum?.trim().length ||
        !role?.trim().length ||
        !rollNum?.trim().length
      )
        throw new Error("Fill all fields properly");
      setloading(true);
      await axios.put("/api/registration", { ...formData });
      toastSuccess("Registration Successful");
      router.push("/questions");
    } catch (error) {
      toastError("Invalid registration details");
    }
    setloading(false);
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
