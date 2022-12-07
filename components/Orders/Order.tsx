import Image from "next/image";
import Link from "next/link";

interface OrderProps {
  status: string;
  total: number;
  id: string;
}
export const Order = ({ status, total, id }: OrderProps) => {
  return (
    <div className=" overflow-hidden rounded-lg border border-gray-100 shadow-sm w-[300px]  m-4">
      <div className="flex flex-col  justify-items-stretch p-2">
        <div className="py-2">
          <h3 className="text-xl font-bold">{status}</h3>
          <p className="mt-2 text-sm text-gray-500">{total}</p>
        </div>

        <div className="inline-block border-b dark:border-teal-300 border-teal-600 pb-1 font-medium text-teal-600 dark:text-teal-300">
          <Link href={`/orders/${id}`}>Details</Link>
          <span aria-hidden="true">&rarr;</span>
        </div>
      </div>
    </div>
  );
};
