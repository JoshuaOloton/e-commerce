import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  id,
  name,
  image,
  desc,
  price,
}: {
  id: string;
  name: string;
  image: string;
  desc: string;
  price: number;
}) => {
  return (
    <Link
      className="ring ring-blue-500/20 p-4 rounded-lg bg-gray-50 hover:bg-gray-200 cursor-pointer hover:shadow-lg shadow-cyan-500/20 transition-all duration-700 group"
      href={`/products/${id}`}
    >
      <div className="w-4/5 mx-auto flex flex-col gap-6 ">
        <div className="w-52 h-52 mx-auto relative">
          <Image
            src={image}
            alt={name}
            fill={true}
            // width={300}
            // height={300}
            className="object-cover rounded-sm transition-all duration-700 group-hover:scale-105"
          />
        </div>
        <div className="">
          <h3 className="font-bold lg:text-lg mb-3">{name}</h3>
          <p className="text-sm leading-6 tracking-wide mb-2">
            {desc.slice(0, 40)}...
          </p>
          <span className="text-sm text-gray-500">N{price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
