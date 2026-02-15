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
            <style>{`
                /* Control de huérfanas y viudas para columnas */
                article p {
                    orphans: 3;
                    widows: 3;
                }
                
                /* Reducir margen del primer párrafo */
                article p:first-of-type {
                    margin-top: 0;
                }
            `}</style>
            <ReactMarkdown
                components={{
                    // Body text
                    p: ({ children, ...props }) => {
                        // Convert children to string to check content
                        const extractText = (node: any): string => {
                            if (typeof node === 'string') return node;
                            if (Array.isArray(node)) return node.map(extractText).join('');
                            if (node?.props?.children) return extractText(node.props.children);
                            return '';
                        };

                        const textContent = extractText(children).trim();

                        // Center if it contains "Polimata", "Polyvalente" or "LIDERAZGO Y GERENCIA"
                        const shouldCenter = textContent.includes('Polimata') || textContent.includes('Polyvalente') || textContent.includes('LIDERAZGO Y GERENCIA');

                        return (
                            <p
                                className={`mb-3 text-sm leading-relaxed text-gray-900 ${shouldCenter ? 'text-center' : 'text-justify'
                                    }`}
                                {...props}
                            >
                                {children}
                            </p>
                        );
                    },
                    strong: ({ ...props }) => <strong className="font-bold text-black" {...props} />,
                    em: ({ ...props }) => <em className="italic text-gray-800" {...props} />,

                    // Images
                    img: ({ node, ...props }) => (
                        <figure className="w-full break-inside-avoid flex flex-col items-center">
                            <img
                                src={props.src}
                                alt={props.alt}
                                className="max-w-[200px] w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            {props.title && <figcaption className="text-sm text-center mt-2 text-gray-900 font-bold w-full">{props.title}</figcaption>}
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
