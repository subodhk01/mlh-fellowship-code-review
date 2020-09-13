import React from 'react'

export default function Error404(){
    return (
        <div className="outerContainer w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="heading">
                404
            </div>
            <div className="subHeading">
                Ops! The page you requested isn't available.
            </div>
            <style jsx>{`
                .outerContainer {
                    background-image: url('/images/new/back.jpg');
                    background-color: #f7fdfd;
                    background-repeat: no-repeat;
                    background-size: contain;
                }
                .heading {
                    font-family: "Poppins";
                    font-size: 12rem;
                    font-weight: 700;
                    line-height: 1;
                    color: #04bfda;
                    text-shadow: 10px 10px 2px #d8f4f8;
                }
                .subHeading {
                    font-size: 2rem;
                    font-weight: 700;
                }
                @media(max-width: 576px){
                    .outerContainer {
                        background-size: 190%;
                    }
                    .heading {
                        font-size: 7rem;
                    }
                    .subHeading {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </div>
    )
}