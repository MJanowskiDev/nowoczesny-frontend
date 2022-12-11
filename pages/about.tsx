import { NextSeo } from "next-seo";
import Image from "next/image";
import aboutImage from "../assets/images/about.svg";
const About = () => {
  return (
    <div>
      <NextSeo title="About" description="About MJanowskiDev E-Commerce App" />
      <main className="w-full md:h-[calc(100vh_-_168px)] h-auto mt-10  md:mt-0 flex justify-center">
        <article className=" h-full w-full prose dark:prose-invert flex flex-col justify-center">
          <h1>
            Homework project along{" "}
            <span className="text-teal-600 dark:text-teal-300 ">
              NOWOCZESNY FRONTEND
            </span>{" "}
            course
          </h1>
          <div className="max-w-4xl w-[70%] mx-auto">
            <Image
              src={aboutImage}
              alt={"MJanowskiDev ecommerce shop - about"}
              layout="responsive"
              width={16}
              height={9}
              objectFit="contain"
            />
          </div>
          <h2 className="text-right">
            The course covers:{" "}
            <span className="text-teal-600 dark:text-teal-300 ">
              Next.js, React, GraphQL and TypeScript
            </span>
            !
          </h2>

          <a
            className="text-right"
            href="https://hyperfunctor.com/nextjs-react-graphql-typescript"
          >
            Detailed course program
          </a>
        </article>
      </main>
    </div>
  );
};

export default About;
