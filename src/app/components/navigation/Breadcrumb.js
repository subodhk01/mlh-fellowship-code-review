import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'

export default function BreadCrumb({items}){
    return (
        <div className="d-flex align-items-center mt-3 p-2 border w-100 rounded">
                {items.map( (value, index) => {
                    if (index == items.length - 1 ){
                        return (
                            <div>
                                <BreadCrumbItem to="">{value}</BreadCrumbItem>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <BreadCrumbItem to="">{value}</BreadCrumbItem><FaChevronRight color="#a3a2a3" size="10" />
                            </div>
                        )
                    }
                } )}
        </div>
    )
}

export function BreadCrumbItem({children, to=""}) {
    return(
        <Link href={to}>
            <a className="px-2 text-muted">
                {children}
            </a>
        </Link>
    )
}