// src/app/page.js
import Head from 'next/head';
import Writer from '../components/Writer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Online Writer</title>
        <meta name="description" content="An online writer with typewriter sound effects and dark mode." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Writer />
    </div>
  );
}
