type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className='flex justify-center h-screen pt-20'>
      <div
        className={
          "w-full laptop:w-1/2 laptop:backdrop-brightness-125 laptop:rounded-xl px-5" +
          " " +
          className
        }
      >
        {children}
      </div>
    </div>
  );
}
