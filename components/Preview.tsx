import { useTextStore } from "@/store/store"
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw'
//@ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//@ts-ignore
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Preview = () => {
  const text = useTextStore((state) => state.text);

  return (
    <div className="flex-1 min-h-screen">
      <div className="px-4 py-2 bg-neutral-800">
        <p className="font-semibold">Preview</p>
      </div>
      <div className="h-full w-full outline-none py-4 px-4 prose prose-invert">
        <ReactMarkdown
          children={text}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            //@ts-ignore
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        />
      </div>
    </div>
  )
}
export default Preview;