import { Modal } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { FaFacebookSquare, FaLinkedin, FaTimes } from 'react-icons/fa'


export default function LoginModal(props) {

    const handleLinkedIn = () => window.open('popup.html', 'name', 'height=585,width=400');

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <div onClick={props.onHide} className="p-0 position-absolute w-100 text-right">
            <div className="d-inline-block p-3 cursor-pointer">
                <FaTimes size={28} color="#133194ea" />
            </div>
        </div>
        <div className="d-flex align-items-center py-5 container-fluid p-0">
            <div className="p-5 form-box">
                <div className="text-center pb-5">
                    <img className="w-50" src="/images/logos/64.png" />
                </div>
                <div className="text-center pb-3">
                    <h3 className="font-weight-bold"><span style={{color: "#00c5ca"}}> Welcome</span> Back</h3>
                </div>
                {/* <div className="text-muted mb-3"><h6>Start the work now</h6></div> */}
                <div className="form-group">
                    <div className="form-control text-center cursor-pointer font-weight-bold" onClick={props.onLoginClick}>
                        <FcGoogle size="22" className="pb-1" /> Login with google
                    </div>
                    <div className="pt-2">
                        By Signing in, you agree to our&nbsp;
                        <Link href="/privacy-policy">
                            <a>Privacy Policy&nbsp;</a>
                        </Link>
                        and &nbsp;
                        <Link href="/terms-and-conditions">
                            <a>Terms & Conditions</a>
                        </Link>
                        
                    </div>
                </div>
                {/* <form>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Username or Email" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" placeholder="Password" />
                    </div>
                    <div className="form-group d-flex justify-content-between">
                        <div className="text-muted">
                            <label className="m-0 d-flex align-items-center"><input className="m-0 mr-1" type="checkbox" />{' '}Remeber me</label>
                        </div>
                        <div>
                            <a href="" className="text-primary-dark font-weight-bold">Forgot Password?</a>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="form-control submitButton" />
                    </div>
                    <div className="form-group">
                        <div className="form-control text-center cursor-pointer" onClick={props.onLoginClick}>
                            <FcGoogle size="18" /> Login with google
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-control text-center cursor-pointer" onClick={handleLinkedIn}>
                            <FaLinkedin size="18" /> Login with LinkedIn
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-control text-center cursor-pointer">
                                <FaFacebookSquare size="18" /> Login with Facebook
                        </div>
                    </div>
                </form>
                <div>
                    Don't have an account <a className="text-primary-dark font-weight-bold" href="">Click Here</a>
                </div> */}
            </div>
            <div className="image-box text-center py-5 pr-5 d-none d-sm-none d-md-none d-lg-block">
                <img className="w-75" src="/images/new/login.svg" />
            </div>
        </div>
        <style jsx>{`
            a{
                color: #00c5ca;
            }
            .container-fluid {
                font-size: 0.8rem;
            }
            .form-control {
                font-size: 0.8rem;
            }
            .form-box {
                flex:5;
            }
            .image-box {
                flex:7;
            }
            .submitButton {
                background: linear-gradient(to right, #0052d4, #4364f7);
                color: white;
            }
        `}</style>
      </Modal>
    );
  }
