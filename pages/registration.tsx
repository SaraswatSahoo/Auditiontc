import { useRouter } from "next/router";
import React, { useState } from "react";
import { toastError, toastSuccess } from "../utils/toast";
import { IUser } from "../types/types";
import { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";
import { departmentList, roleList } from "../utils/data";
import axios from "axios";
import Spinner from "../components/Spinner";

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
  const fieldClassName = "flex gap-10 items-center";
  const titleClassName =
    "uppercase font-semibold text-white font-extrabold text-3xl w-80";
  const inputClassName =
    "focus:outline-none px-4 py-2 mt-2 rounded-xl bg-white bg-opacity-5 text-white inputShadow w-full h-[4.5rem] placeholder:text-white";
  return (
    <>
      <div className='mx-60 my-10 backdrop-brightness-125 pl-40 pt-5 pr-8 rounded-xl'>
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
                Select yout department
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

          <button
            disabled={loading}
            type='submit'
            className='bg-stone-600 text-white rounded-xl capitalize font-extrabold w-40 self-center center text-xl my-6 py-2'
          >
            {loading && Spinner({ size: "w-8 h-8" })}
            {!loading && <p>Next</p>}
          </button>
        </form>
      </div>
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
      await axios.put("/api/registration", { ...formData });
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
