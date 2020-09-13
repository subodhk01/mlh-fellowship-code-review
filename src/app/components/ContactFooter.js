import {FaMapMarkerAlt, FaRegEnvelope} from 'react-icons/fa'
import { loadFirebase } from '../lib/firebase'

export default function ContactFooter(){
    const [msg, setMsg] = React.useState("")
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')

    const handleSubmit = async (event) => {
        setMsg("")
        event.preventDefault();
        let firebase = await loadFirebase();
        firebase.firestore().collection('contact')
            .add({
                time: (new Date),
                name: name,
                email: email,
                message: message,
            })
            .then(doc => {
                setName("")
                setEmail("")
                setMessage("")
                setMsg("Thank you for contacting us, we will get back to you as soon as possible!")
            })
            .catch(error => {
                setMsg("Error in submitted you request, please try again")
                console.log(error)
            });
    }
    return (
        <section className="section-default section-contact py-5 text-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Contact Us</h1>
              </div>
            </div>
            <div className="row m-auto py-5">
                <div className="col-sm-12 col-md-6 order-2 mb-3">
                    <div className="bg-white p-5 formContainer border-radius">
                        <div className="mb-4 mt-3">
                            <h4>For anything,</h4>
                            <h5>Drop us a line</h5>
                        </div>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input className="form-control px-3" type="text" name="name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <input className="form-control px-3" type="email" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" name="message" rows="3" placeholder="Message" value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="form-control-submit-button">Contact</button>
                            </div>
                            <div>
                                {msg}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 mb-3 text-center d-flex flex-column">
                    <div className="info-box mx-auto mb-3 py-5 bg-white border-radius d-flex flex-column align-items-center justify-content-center">
                        <FaMapMarkerAlt color="orange" size="24" />
                        <h4 className="my-2">Our Address</h4>
                        <p className="p-0 mb-0">NSRCEL, IIM Bangalore <br/> Bannerghatta Road, Bangalore</p>
                    </div>
                    <div className="info-box mx-auto py-5 bg-white border-radius d-flex flex-column align-items-center justify-content-center">
                        <FaRegEnvelope color="orange" size="24" />
                        <h4 className="my-2">Email Us</h4>
                        <p className="p-0 mb-0">
                            <a href="mailto:contact@nestin.io">contact@nestin.io</a>
                            <br/>
                            <a href="mailto:partner@nestin.io">partner@nestin.io</a>
                        </p>
                    </div>
                </div>
            </div>
          </div>
          <style jsx>{`
                .formContainer {
                    border: 1px solid #c4d8dc;
                }
                .info-box {
                    height: 50%;
                    width: 100%;
                    max-width: 500px;
                    border: 1px solid #c4d8dc;
                }

                .info-box p {
                    line-height: 24px;
                    font-size: 14px;
                }
          `}</style>
        </section>
    )
}
