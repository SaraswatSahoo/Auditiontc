import { fromZodError } from "zod-validation-error";

export default function (error: any) {
  const zError = fromZodError(error);
  return zError ? zError.message : error.message;
}
