import type { NextPage } from "next";
import Image from "next/image";

import homeImage from "../assets/images/home.svg";

const Home: NextPage = () => {
  return (
    <main className="w-full md:h-[calc(100vh_-_168px)] h-auto mt-10  md:mt-0 flex justify-center">
      <article className=" h-full w-full prose dark:prose-invert flex flex-col justify-center">
        <h1>MJanowskiDev store</h1>
        <div className="max-w-4xl">
          <Image
            src={homeImage}
            alt={"MJanowskiDev ecommerce shop"}
            layout="responsive"
            width={16}
            height={9}
            objectFit="contain"
          />
        </div>
        <h2 className="text-right">
          Let&apos;s indulge in a{" "}
          <span className="text-teal-600 dark:text-teal-300 ">
            shopping spree
          </span>
          !
        </h2>
      </article>
    </main>
  );
};

export default Home;
