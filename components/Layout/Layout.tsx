import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { LayoutProps } from '@/models/interface'
import Header from './Header';
import Footer from './Footer';
import Top from '../components/Top';

const Layout = ({ meta, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content="Koleksi Resepi Terbaik Malaysia." />

                 {/* Google / Search Engine Tags  */}
                <meta itemProp="name" content={meta.title} />
                <meta itemProp="description" content={meta.description} />
                <meta itemProp="image" content={meta.image} />

                 {/* Facebook Meta Tags  */}
                <meta property="og:url" content={meta.pathUrl}/>
                <meta property="og:type" content={meta.type} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:image" content={meta.image} />

                 {/* Twitter Meta Tags  */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />

            </Head>
            <Header />
            <main>
                {children}
                <Top />
            </main>
            <Footer />
        </>
    )
}

export default Layout