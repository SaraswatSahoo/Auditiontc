import { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";

export default function Thankyou() {
  return <div>Thankyou</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
