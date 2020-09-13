import TextField from '@material-ui/core/TextField'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import {FaRegEnvelope, FaMapMarkerAlt} from 'react-icons/fa'
import { loadFirebase } from '../lib/firebase'

export default function ContactNew() {
    const [msg, setMsg] = React.useState("")
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [preffered, setPreffered] = React.useState('');

    const handleSubmit = async (event) => {
        setMsg("")
        event.preventDefault();
        let firebase = await loadFirebase();
        firebase.firestore().collection('contact')
            .add({
                time: (new Date),
                name: name,
                email: email,
                phone: phone,
                preffered_mode: preffered,
                message: message,
            })
            .then(doc => {
                setName("")
                setEmail("")
                setPhone("")
                setMessage("")
                setPreffered("")
                setMsg("Thank you for contacting us, we will get back to you as soon as possible!")
            })
            .catch(error => {
                setMsg("Error in submitted you request, please try again")
                console.log(error)
            });
    }

    return (
        <section className="section-default section-contact px-3 position-relative">
            <div className="row no-gutters container m-auto">
                <div className="col-md-12 col-lg-6 order-2 align-self-center">
                    <div className="bg-white bordered p-5 formContainer m-auto">
                        <div className="text-muted mb-4">
                            <h5>Send us a Message</h5>
                        </div>
                        <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group"><TextField required label="Name" fullWidth={true} value={name} onChange={(event) => setName(event.target.value)} /></div>
                                <div className="form-group"><TextField required type="email" label="Email" fullWidth={true} value={email} onChange={(event) => setEmail(event.target.value)} /></div>
                                <div className="form-group"><TextField required label="Phone" fullWidth={true} value={phone} onChange={(event) => setPhone(event.target.value)} /></div>
                                <div className="form-group pt-3 m-0">
                                    <FormLabel component="legend">Preffered method of communication</FormLabel>
                                    <RadioGroup required row aria-label="gender" value={preffered} onChange={(event) => setPreffered(event.target.value)}>
                                        <FormControlLabel value="email" control={<Radio color="primary" />} label="Email" />
                                        <FormControlLabel value="phone" control={<Radio color="primary" />} label="Phone" />
                                    </RadioGroup>
                                </div>
                                <div className="form-group"><TextField required label="Message" fullWidth={true} value={message} onChange={(event) => setMessage(event.target.value)} /></div>
                                <div className="pt-4 text-center">
                                    <div className="pb-2 text-info">
                                        {msg}
                                    </div>
                                    <button type="submit" className="form-control btn btn-solid-reg">Contact</button>
                                </div>
                            </form>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6 text-center py-5 my-5">
                    <div className="text-left px-5 pb-3">
                        <h3 className="text-white">Contact Us</h3>
                        <p className="subheading">Feel like contacting us? Submit your queries here and we will get back to yoou as soon as possible.</p>
                    </div>
                    <div className="info-box mx-auto mb-3 py-5 bg-white">
                        <FaMapMarkerAlt color="orange" size="24" />
                        <h3 className="my-2">Our Address</h3>
                        <p className="p-0 mb-0">NSRCEL, IIM Bangalore <br/> Bannerghatta Road, Bangalore</p>
                    </div>
                    <div className="info-box mx-auto py-5 bg-white">
                        <FaRegEnvelope color="orange" size="24" />
                        <h3 className="my-2">Email Us</h3>
                        <p className="p-0 mb-0">
                            <a href="mailto:contact@nestin.io">contact@nestin.io</a>
                            <br/>
                            <a href="mailto:partner@nestin.io">partner@nestin.io</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="custom-shape-divider-bottom-1597486854">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>
            <style jsx>{`
                .section-contact{
                    background: linear-gradient(to bottom,#007cf6,#04bfda);
                    background-size: cover;
                    background-repeat: no-repeat;
                    z-index: 0;
                }
                .custom-shape-divider-bottom-1597486854 {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    z-index: -1;
                    width: 100%;
                    overflow: hidden;
                    line-height: 0;
                    transform: rotate(180deg);
                }
                
                .custom-shape-divider-bottom-1597486854 svg {
                    position: relative;
                    display: block;
                    width: calc(100% + 1.3px);
                    height: 500px;
                    transform: rotateY(180deg);
                }
                
                .custom-shape-divider-bottom-1597486854 .shape-fill {
                    fill: #f9fafc;
                }
                .subheading{
                    color: #bccce4;
                    max-width: 300px;
                }
                .formContainer {
                    max-width: 430px;
                    border-radius: 10px;
                    box-shadow: 0 5px 30px rgba(14, 15, 16, 0.3);
                }
                .info-box {
                    max-width: 500px;
                    color: #444444;
                    box-shadow: 0 0 30px rgba(14, 15, 16, 0.3);
                }
                .info-box h3 {
                    font-size: 20px;
                    font-weight: 700;
                }
                .info-box p {
                    line-height: 24px;
                    font-size: 14px;
                }
            `}</style>
        </section>
    )
}
