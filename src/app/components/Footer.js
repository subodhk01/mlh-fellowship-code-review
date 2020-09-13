import Link from 'next/link'
import { FaLinkedin } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'

export default function footer(){
    return (
        <footer className="border-top" id="footer">
            <div className="row py-5 container align-items-center">
                <div className="col-xs-12 col-md-3 image-container logo-image-container">
                    <Link href="/">
                        <a>
                            <img src="/images/logos/64.png" />
                        </a>
                    </Link>
                </div>
                <div className="col-6 col-md-3 image-container">
                    <Link href="/">
                        <a>
                            <img src="/images/stores/playstore.png" />
                        </a>
                    </Link>
                </div>
                <div className="col-6 col-md-3 image-container">
                    <Link href="/">
                        <a>
                            <img src="/images/stores/appstore.png" />
                        </a>
                    </Link>
                </div>
                <div className="col-xs-12 col-md-3 footer-social d-flex justify-content-center">
                    <div className="p-3">
                        <a href="https://www.instagram.com/nestin.io/">
                            <GrInstagram color="#FD1D1D" size="35" />
                        </a>
                    </div>
                    <div className="p-3">
                        <a href="https://www.linkedin.com/company/appnestin/">
                            <FaLinkedin color="#0e76a8" size="36" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footercontent container">
                <div className="footerHeadingContainer">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/contact-us">
                        <a>Contact Us</a>
                    </Link>
                    <Link href="/about">
                        <a>About Us</a>
                    </Link>
                </div>
                <div>
                    <Link href="/listings">
                        <a>Work Cafes</a>
                    </Link>
                    <Link href="/list-space">
                        <a>List Space</a>
                    </Link>
                    <Link href="/suggest-space">
                        <a>Suggest Space</a>
                    </Link>
                    <Link href="/privacy-policy">
                        <a>Privacy Policy</a>
                    </Link>
                    <Link href="/terms-and-conditions">
                        <a>Terms and conditions</a>
                    </Link>
                    {/* <Link href="/testimonials">
                        <a>Testimonials</a>
                    </Link> */}
                    <Link href="/faq">
                        <a>FAQ</a>
                    </Link>
                </div>
            </div>
            <div className="footer-end">
                &copy; Copyright NestIn {(new Date()).getFullYear()} - All rights Reserved
            </div>
        </footer>
    )
}
