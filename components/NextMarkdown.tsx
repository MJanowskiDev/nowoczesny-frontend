import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { externalLinkRegex } from "../utils";

import { MDXResult } from "../utils";

export const NextMarkdown = ({ children }: { children: MDXResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props}></a>;
          } else {
            if (href.match(externalLinkRegex)) {
              return <a href={href} rel="noopener noreferrer" {...props}></a>;
            } else {
              return (
                <Link href={href}>
                  <a {...props}></a>
                </Link>
              );
            }
          }
        },
      }}
    ></MDXRemote>
  );
};
