import Head from 'next/head'
import Navigation from './navigation/Navigation';
import Footer from './Footer'
import cookie from 'react-cookies'

export default function Layout(props){
    const [ loginModal, setLoginModal ] = React.useState(false)
    const [ spinner, setSpinner ] = React.useState(false)
    const handleModal = (value) => {
        setLoginModal(value)
    }
    const handleSpinner = () => {
        setSpinner(!spinner)
    }
    const children = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            handleModal: handleModal
        });
    });
    return (
        <div>
            <Head>
                <title>Nestin {props.city} - flexible working {props.city && `in ${props.city}`} - right from the space next to you!</title>
            </Head>
            <Navigation handleSpinner={handleSpinner} handleModal={handleModal} modal={loginModal} fullScreenNav={props.fullScreenNav} />
                {children}
            <Footer />
        </div>
    )
}
