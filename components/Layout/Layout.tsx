import { disclaimer, githubDescription, githubLink } from '@/constants/data'
import { LayoutProps } from '@/models/interface'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const Layout = ({ meta, children }: LayoutProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="robots" content="follow, index" />
                <meta name="description" content={meta.description} />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <main>
                {children}
                <button
                    className={`fixed z-30 bottom-0 right-0 cursor-pointer p-5 ${isVisible ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-300 bg-blue-500 text-white rounded`}
                    onClick={scrollToTop}
                >
                    Back to Top
                    {/* Will change to fonticon */}
                </button>

            </main>
            <footer className='grid place-content-center py-5 text-sm bg-primary-backgroud-blue' >
                <a className='hover:underline transition-all duration-100 ease-in-out' target="_blank" href={githubLink} rel="noopener noreferrer" title={githubDescription}>
                    {disclaimer}
                </a>
            </footer>
        </>
    )
}

export default Layout