export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-gray-100 w-full flex flex-col bg-gray-700 border-1 border-gray-500 max-w-[560px] items-center rounded-lg transition-all duration-[1s] ease-linear">
      {children}
    </div>
  );
}
