import { cn } from '@/utils/cn';

export default function ListItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        'bg-gray-600 border-1 border-dashed border-gray-500 text-base lg:text-xl py-2 px-4 rounded-lg flex justify-between text-gray-300',
        className,
      )}
    >
      {children}
    </li>
  );
}
