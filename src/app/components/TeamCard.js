import {FaFacebookSquare, FaGithub} from 'react-icons/fa'
import {FiTwitter} from 'react-icons/fi'

export default function TeamCard({ name, info, image }){
    return (
        <div className="m-4">
            <div className="card border-0 m-auto">
                <div className="card-header">

                </div>
                <div className="card-body p-3">
                    <h4 className="card-title m-0">{name}</h4>
                    <p className="card-text m-0 text-muted font-weight-light">{info}</p>
                </div>
                <div className="card-footer">
                    <div className="link-container d-flex justify-content-center align-items-center h-100">
                        <div className="linkItem p-0 text-center border-right">
                            <a href="" className="p-3 d-flex justify-content-center align-items-center">
                                <FaFacebookSquare color="#4267B2" />
                            </a>
                        </div>
                        <div className="linkItem p-0 text-center">
                            <a href="" className="p-3 d-flex justify-content-center align-items-center">
                                <FiTwitter color="#1DA1F2" />
                            </a>
                        </div>
                        <div className="linkItem p-0 text-center border-left">
                            <a href="" className="p-3 d-flex justify-content-center align-items-center">
                                <FaGithub color="#24292e" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .card {
                    width: 300px;
                    height: 400px;
                    box-shadow: 0px 2px 30px -5px #b4c0c5;
                }
                .card-header {
                    height: 75%;
                    background: url(${image});
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
                .card-body {
                    height: 25%;
                }
                .card-footer {
                    padding: 0;
                    height: 0px;
                    transition: 0.3s all;
                    overflow: hidden;
                }
                .linkItem {
                    flex-grow: 4;
                    font-size: 20px;
                    transition: all 0.1s;
                }
                .linkItem:hover {
                    font-size: 30px;
                }
                .card:hover .card-footer {
                    height: 20%;
                }
            `}</style>
        </div>
    )
}
