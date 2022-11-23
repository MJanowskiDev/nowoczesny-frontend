import type { NextPage } from "next";
import Image from "next/image";

import homeImage from "../assets/images/home.svg";
import { NewsletterForm } from "../components/NewsletterForm";

const Home: NextPage = () => {
  return (
    <main className="w-full  h-auto mt-10  md:mt-0 flex justify-center">
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
          <span className="text-teal-300 dark:text-teal-300 ">
            shopping spree
          </span>
          !
        </h2>
        <div className="">
          <div>
            <h3>Be in the know</h3>
            <p>
              Stay up to date with the roadmap progress, announcements and
              exclusive discounts feel free to sign up with your email.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </article>
    </main>
  );
};

export default Home;
