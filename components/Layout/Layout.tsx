import { LayoutProps } from '@/models/interface'
import Head from 'next/head'
import React from 'react'

const Layout = ({ meta, children }: LayoutProps) => {
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
            <main className='font-inter'>
                {children}
            </main>
        </>
    )
}

export default Layout