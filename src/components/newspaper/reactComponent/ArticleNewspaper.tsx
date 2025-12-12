import React from 'react';
import ReactMarkdown from 'react-markdown';
// Import content from markdown file
import articleContentDefault from '../articles/article_1.md?raw';

interface ArticleProps {
    articleContent?: string;
    className?: string;
}

const ArticleNewspaper: React.FC<ArticleProps> = ({ articleContent = articleContentDefault, className = '' }) => {
    // Strip YAML frontmatter if present
    const content = articleContent.replace(/^---[\s\S]*?---\s*/, '');

    return (
        <article className={`w-full max-w-none ${className}`}>
            <ReactMarkdown
                components={{
                    // Typography
                    h1: ({ ...props }) => <h1 className="text-4xl md:text-5xl font-serif font-black text-black mb-4 leading-tight uppercase tracking-tight border-b-2 border-black pb-2" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mt-8 mb-3 uppercase tracking-wide leading-none" {...props} />,
                    h3: ({ ...props }) => <h3 className="text-xl font-serif font-bold italic text-black mt-6 mb-2" {...props} />,
                    h4: ({ ...props }) => <h4 className="text-lg font-sans font-semibold text-black mt-4 mb-2 uppercase" {...props} />,

                    // Body text
                    p: ({ ...props }) => <p className="mb-4 font-serif text-lg leading-relaxed text-gray-900 text-justify" {...props} />,
                    strong: ({ ...props }) => <strong className="font-bold text-black" {...props} />,
                    em: ({ ...props }) => <em className="italic text-gray-800" {...props} />,

                    // Lists
                    ul: ({ ...props }) => <ul className="list-disc list-outside ml-6 mb-4 font-serif text-lg text-gray-900" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal list-outside ml-6 mb-4 font-serif text-lg text-gray-900" {...props} />,
                    li: ({ ...props }) => <li className="mb-1 pl-1" {...props} />,

                    // Quotes & Code
                    blockquote: ({ ...props }) => (
                        <blockquote className="border-l-4 border-black pl-4 my-6 py-2 bg-gray-50 italic font-serif text-xl leading-snug text-gray-700 shadow-sm" {...props} />
                    ),
                    code: ({ ...props }) => <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-sm text-red-600" {...props} />,
                    pre: ({ ...props }) => <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4 border border-gray-200" {...props} />,

                    // Links & Dividers
                    a: ({ ...props }) => <a className="text-blue-800 underline hover:text-blue-600 transition-colors decoration-1 underline-offset-2" {...props} />,
                    hr: ({ ...props }) => <hr className="border-t-2 border-black my-8 opacity-20" {...props} />,

                    // Images
                    img: ({ node, ...props }) => (
                        <figure className="my-6 w-full break-inside-avoid">
                            <img
                                src={props.src}
                                alt={props.alt}
                                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-gray-900 p-1 shadow-md"
                            />
                            {props.title && <figcaption className="text-sm italic text-center mt-2 text-gray-600 font-serif w-full">{props.title}</figcaption>}
                        </figure>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default ArticleNewspaper;
