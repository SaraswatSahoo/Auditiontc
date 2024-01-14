export default function (destination: string, url: string) {
  if (url === destination || url?.startsWith("/_next")) return { props: {} };
  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}
