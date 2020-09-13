import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../public/css/details.css'
import '../public/css/style.css'
import '../public/css/index.css'

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp