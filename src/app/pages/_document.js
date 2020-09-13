import Document, { Head, Html, Main, NextScript } from 'next/document'
import Layout from '../components/Layout'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="google-site-verification" content="*|REMOVED|*" />
                    <meta name="description" content="The purpose of Nestin is to help budding entrepreneurs, startups, corporates, digital nomads, freelancers, remote workers and independent professionals achieve their dreams and get their work done by providing them with flexible working and meeting spaces in Cafes, lounges, and co-working places, right next door."></meta>
                    <meta name="keywords" content="Nestin, Coworking, Nestin Spaces, Coworking spaces"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <link rel="icon" href="/images/logos/icon.png" type="image/png" />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
                    <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
                    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument