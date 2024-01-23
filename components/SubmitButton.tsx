import Spinner from "./Spinner";

type SubmitButtonProps = {
  loading: boolean;
  label: string;
  className?: string;
};
export default function SubmitButton({
  loading,
  label,
  className,
}: SubmitButtonProps) {
  return (
    <button
      disabled={loading}
      type='submit'
      className={
        "bg-neutral-500 text-white rounded-xl capitalize font-extrabold w-40 self-end center text-xl my-6 py-2 hoverEffect" +
        " " +
        className
      }
    >
      {loading && Spinner({ size: "w-8 h-8" })}
      {!loading && <p>{label}</p>}
    </button>
  );
}
