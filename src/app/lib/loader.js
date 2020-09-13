import React from 'react'
import BounceLoader from 'react-spinners/BounceLoader'

export default function Loader() {
    return (
        <div className="w-100">
            <BounceLoader color="#00c5ca" size="39px" css="margin: auto" />
        </div>
    )
}