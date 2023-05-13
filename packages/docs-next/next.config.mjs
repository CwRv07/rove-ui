// Remark packages
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
// Rehype packages
import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import nextMDX from "@next/mdx";
// import rehypeToc from "@jsdevtools/rehype-toc"

// const customizeTOC = (toc) => {
//   try {
//     const { children } = toc;
//     console.log('child',children[0].children)
//     const childrenOfChildren = children?.[0]?.children;
//     if (!children?.length || !childrenOfChildren?.length) return null;
//   } catch (e) { }
//   return {
//     type: "element",
//     tagName: "div",
//     properties: { className: "toc hidden md:block fixed right-0" },
//     children: [
//       {
//         type: "element",
//         tagName: "p",
//         properties: { className: "title" },
//         children: [
//           {
//             type: "text",
//             value: "Table of Contents",
//           },
//         ],
//       },
//       ...(toc.children || []),
//     ],
//   };
// };

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      [remarkFootnotes, { inlineNotes: true }],
    ],
    rehypePlugins: [
      rehypeSlug,
      // rehypeAutolinkHeadings,
      [rehypePrismPlus, { ignoreMissing: true }],
      // [rehypeToc, {
      //   headings: ['h2', 'h3', 'h4'],
      //   customizeTOC
      // }]
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
};

export default withMDX(nextConfig);
