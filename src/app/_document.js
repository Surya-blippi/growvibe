// src/app/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Force explicit OpenGraph tags that LinkedIn will prioritize */}
        <meta property="og:title" content="AutoCollab - AI-Powered Distribution Engine" />
        <meta property="og:description" content="Autonomous influencer marketing to grow your revenue" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.autocollab.co/" />
        <meta property="og:site_name" content="AutoCollab" />
        
        {/* Additional tags to help LinkedIn */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AutoCollab - AI-Powered Distribution Engine" />
        <meta name="twitter:description" content="Autonomous influencer marketing to grow your revenue" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}