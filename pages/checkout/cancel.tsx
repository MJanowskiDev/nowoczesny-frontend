import Image from "next/image";
import cancelImage from "../../assets/images/cancel.svg";
const CancelPage = () => {
  return (
    <div>
      <main className="w-full md:h-[calc(100vh_-_168px)] h-auto mt-10  md:mt-0 flex justify-center">
        <article className=" h-full w-full prose dark:prose-invert flex flex-col justify-center">
          <h1>Payment FAILED </h1>
          <div className="max-w-4xl">
            <Image
              src={cancelImage}
              alt={"MJanowskiDev ecommerce shop - about"}
              layout="responsive"
              width={16}
              height={9}
              objectFit="contain"
            />
          </div>
          <h2 className="text-right">
            <span className="text-teal-600 dark:text-teal-300 ">
              Please try once again.
            </span>
          </h2>
        </article>
      </main>
    </div>
  );
};

export default CancelPage;
