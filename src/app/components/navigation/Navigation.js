import Link from 'next/link'
import Router from 'next/router'
import cookie from 'react-cookies'
import LoginModal from '../LoginModal'
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
import Select from 'react-select'
import { loadFirebase } from '../../lib/firebase'
import withAuth from '../../lib/withAuth.js'
import { FaInstagramSquare, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa'

function Navigation(props) {
    const [ citySelectShow, setCitySelectShow ] = React.useState(false);
    const [ selectValue, setSelectValue ] = React.useState({ value: null, label: 'Loading...' })
    const [ cityList, setCityList ] = React.useState([])
    const [ spinner, setSpinner ] = React.useState(false)
    const [ topClass, setTopClass ] = React.useState(props.fullScreenNav ? "" : "top-nav-collapse");

    const handleSelectChange = (data) => {
        setSelectValue(data)
        cookie.save('city', data.value)
        setSpinner(true)
        if(window.location.pathname == "/"){
            window.location.reload(false)
        }else {
            Router.push('/')
        }
    }

    const handleSignIn = async () => {
        var firebase = await loadFirebase();
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        firebase.auth().signInWithPopup(provider)
            .then(() => {
                props.handleModal(false);
            })
            .catch(err => {
                alert('Error Processing request, try again.');
                console.log(err);
            });
    }

    const handleLogout = async () => {
        var firebase = await loadFirebase();
        firebase.auth().signOut().then(function () {
            //console.log("Logout success")
        }).catch(function (err) {
            alert('Error Processing request, try again.');
            console.log(err);
        });
    }

    const getCities = async() => {
        let firebase = await loadFirebase();
        let result = await new Promise((resolve, reject) => {
            firebase.firestore().collection('cities')
                .where('enabled',"==",true)
                .get()
                .then(snapshot => {
                    let items = [];
                    snapshot.forEach(doc => {
                        items.push({
                            value: doc.data().name,
                            label: doc.data().name
                        })
                    });
                    resolve(items);
                })
                .catch(error => {
                    console.log(error)
                    reject([]);
                });
        });
        setCityList(result)
        const city = cookie.load('city')
        if(city){
            setSelectValue({value: city, label: city})
        }else {
            var defaultCity = "Gurgaon"
            cookie.save('city', defaultCity)
            setSelectValue({value: defaultCity, label: defaultCity})
        }
        const firstVisit = cookie.load('firstVisit')
        if(!firstVisit){
            setCitySelectShow(true)
            cookie.save('firstVisit', 'done')
        }
    }

    React.useEffect(() => {
        getCities();
        props.fullScreenNav && window && window.addEventListener('scroll', () => {
            if(window.scrollY > 60){
                setTopClass('top-nav-collapse');
            } else {
                setTopClass('');
            }
        });
    } ,[])

    return (
        <div>
        <LoadingOverlay
            active={spinner}
            spinner={<BounceLoader color="#00c5ca" size="28px" />}
            styles={{
                overlay: (base) => ({
                    ...base,
                    background: 'rgba(0, 0, 0, 0.1)'
                })
                }}
        >
            <CityModal 
                show={citySelectShow} 
                onHide={() => setCitySelectShow(false)} 
                cities={cityList} 
                handleSelectChange={handleSelectChange} 
            />
            <nav className={`navbar navbar-expand-lg navbar-dark navbar-custom ${props.fullScreenNav ? "fixed-top" : ""} ${topClass}`}>

                <Link href="/">
                    <a className="navbar-brand logo-image"><img src="/images/logos/64.png" alt="alternative" /></a>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-awesome fas fa-bars">
                        <FaBars size="27" color="lightblue" />
                    </span>
                    <span className="navbar-toggler-awesome fas fa-times">
                        <FaTimes size="24" color="silver" />
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav ml-auto align-items-center">
                        <div className="navbar-item selectItem">
                            <Select
                                id="1"
                                instanceId="1"
                                inputId="1"
                                options={cityList}
                                value={selectValue}
                                onChange={handleSelectChange}
                            />
                        </div>

                        <li className="nav-item cursor-pointer">
                            <Link href="/">
                                <a className="nav-link page-scroll">Home <span className="sr-only">(current)</span></a>
                            </Link>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <a href="https://blog.nestin.io" className="nav-link page-scroll">Blog</a>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <Link href="/contact-us">
                                <a className="nav-link page-scroll">Contact</a>
                            </Link>
                        </li>
                        { !props.user &&
                            <li onClick={() => props.handleModal(true)} className="nav-item cursor-pointer">
                                <a className="nav-link">Login</a>
                            </li>
                        }
                        { props.user &&
                            <>

                                <li className="nav-item cursor-pointer">
                                    <Link href="/orders">
                                        <a className="nav-link">Orders</a>
                                    </Link>
                                </li>

                                <li onClick={handleLogout} className="nav-item cursor-pointer">
                                    <a className="nav-link">Logout</a>
                                </li>
                            </>
                        }
                        <li className="nav-item cursor-pointer">
                            <a href="https://www.instagram.com/nestin.io/" className="nav-link page-scroll">
                                <div className="fa-stack d-flex align-items-center">
                                        <FaInstagramSquare color="#E1306C" size="20" />
                                </div>
                            </a>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <a href="https://www.linkedin.com/company/appnestin/" className="nav-link page-scroll">
                                <div className="fa-stack d-flex align-items-center">
                                        <FaLinkedin color="#0e76a8" size="20" />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <LoginModal
                show={props.modal}
                onHide={() => props.handleModal(false)}
                onLoginClick={handleSignIn}
            />
        </LoadingOverlay>
        </div>
    )
}

export default withAuth(Navigation);

function CityModal(props){
    return (
        <div className={`position-fixed w-100 outerContainer ${props.show ? "visible" : "hidden"}`}>
            <div onClick={props.onHide} className="p-0 position-absolute w-100 text-right">
                <div className="d-inline-block p-3 cursor-pointer">
                    <FaTimes size={28} color="#133194ea" />
                </div>
            </div>
            <div className="w-100 bg-white py-5 text-center">
                <div>
                    <h2>Select City</h2>
                </div>
                <div className="p-2 d-flex justify-content-center flex-wrap">
                    { props.cities && props.cities.map((city, index) =>
                        <div className="p-2 p-md-3" key={index}>
                            <div className="item d-flex align-items-center justify-content-center cursor-pointer" onClick={() => props.handleSelectChange(city)}>
                                {city.label}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                .outerContainer{
                    z-index: 10000;
                    box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.22);
                    transition: 0.4s;
                }
                .visible {
                    top: 0;
                    opacity: 1;
                }
                .hidden {
                    top: -400px;
                    opacity: 0;
                }
                .item{
                    box-shadow: 0px 0px 20px -2px rgba(0,0,0,0.18);
                    border-radius: 5px;
                    height: 100px;
                    width: 100px;
                }
            `}</style>
        </div>
    )
}