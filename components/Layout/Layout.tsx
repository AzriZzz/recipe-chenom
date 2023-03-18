import { disclaimer, githubDescription, githubLink } from '@/constants/data'
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
            <main>
                {children}
                <div className='fixed z-0 bottom-0 right-0 cursor-pointer'>
                    Back to Top
                </div>
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