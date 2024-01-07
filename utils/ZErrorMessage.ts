import { fromZodError } from "zod-validation-error";

export default function (error: any) {
  const zError = fromZodError(error);
  const errorMessage = zError ? zError.message : error.message;
  console.log(errorMessage);
  return errorMessage;
}
