import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { LayoutProps } from '@/models/interface'
import Header from './Header';
import Footer from './Footer';

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
            <Header />
            <main>
                {children}
                <button
                    className={`fixed bg-neutral-silver z-30 bottom-1 right-1 md:bottom-5 md:right-5 cursor-pointer p-3 md:p-5 ${isVisible ? 'opacity-70' : 'opacity-0'
                        } transition-opacity duration-300 text-white `}
                    onClick={scrollToTop}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>

            </main>
            <Footer />
        </>
    )
}

export default Layout