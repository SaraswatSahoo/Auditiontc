import { useRouter } from "next/router";
import React, { useState } from "react";
import { toastError, toastSuccess } from "../utils/toast";
import { IUser } from "../types/types";
import type { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";
import { departmentList, roleList } from "../utils/data";
import axios from "axios";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout";
import SubmitButton from "../components/SubmitButton";

export default function Registration() {
  type IFormData = Pick<
    IUser,
    "name" | "rollNum" | "department" | "phoneNum" | "role1" | "role2"
  >;

  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    rollNum: "",
    phoneNum: "",
    department: "",
    role1: "",
    role2: "",
  });
  const fieldClassName = "flex laptop:gap-10 items-center";
  const titleClassName =
    "uppercase text-white py-2 font-serif laptop:text-2xl w-52 laptop:w-80";
  const inputClassName =
    "focus:outline-none px-4 py-2 mt-2 rounded-xl bg-white bg-opacity-5 text-white inputShadow w-full h-[3.5rem] placeholder:text-white text-xs placeholder:text-xs laptop:placeholder:text-md";
  return (
    <Layout className='laptop:pl-40 laptop:pt-5 laptop:pr-8'>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
        {/* Name */}
        <div className={fieldClassName}>
          <div className={titleClassName}>Name</div>
          <input
            type='text'
            name='name'
            placeholder='Enter your name'
            className={inputClassName}
            value={formData.name}
            onChange={changeHandler}
            autoComplete='off'
          />
        </div>
        {/* Roll Number */}
        <div className={fieldClassName}>
          <div className={titleClassName}>Roll</div>
          <input
            type='text'
            name='rollNum'
            placeholder='Enter your roll number'
            className={inputClassName}
            value={formData.rollNum}
            onChange={changeHandler}
            autoComplete='off'
          />
        </div>
        {/* Phone number */}
        <div className={fieldClassName}>
          <div className={titleClassName}>Phone</div>
          <input
            type='text'
            name='phoneNum'
            placeholder='Enter your phone number'
            className={inputClassName}
            value={formData.phoneNum}
            onChange={changeHandler}
            autoComplete='off'
          />
        </div>
        {/* Department */}
        <div className={fieldClassName}>
          <div className={titleClassName}>Dept</div>
          <select
            name='department'
            className={inputClassName}
            value={formData.department}
            onChange={changeHandler}
          >
            <option value='' disabled hidden>
              Select your department
            </option>
            {departmentList.map((dept) => (
              <option key={dept} value={dept} className='text-black'>
                {dept}
              </option>
            ))}
          </select>
        </div>
        {/* Domain1 */}
        <div className={fieldClassName}>
          <div className={titleClassName}>Domain1</div>
          <select
            name='role1'
            className={inputClassName}
            value={formData.role1}
            onChange={changeHandler}
          >
            <option value='' disabled hidden>
              Select domain1
            </option>
            {roleList.map((dept) => {
              if (dept !== formData.role2 && dept !== "admin") {
                return (
                  <option key={dept} value={dept} className='text-black'>
                    {dept}
                  </option>
                );
              }
            })}
          </select>
        </div>
        {/* Domain2 */}
        <div className={fieldClassName}>
          <div className={titleClassName}>Domain2</div>
          <select
            name='role2'
            className={inputClassName}
            value={formData.role2}
            onChange={changeHandler}
          >
            <option value='' disabled hidden>
              Select domain2
            </option>
            {roleList.map((dept) => {
              if (dept !== formData.role1 && dept !== "admin") {
                return (
                  <option key={dept} value={dept} className='text-black'>
                    {dept}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <SubmitButton
          loading={loading}
          label='Next'
          className='laptop:self-start'
        />
      </form>
    </Layout>
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
      await axios.put("/api/registration", formData);
      toastSuccess("Registration Successful");
      router.replace("/questions");
    } catch (error: any) {
      toastError(error.response.data.message);
    }
    setloading(false);
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
