import Link from "next/link"
import Image from "next/image"
import {FaBars} from "react-icons/fa"
const Navbar = () => {
  return (
    <header className="sticky top-0 bg-white text-black shadow z-50">
    <div className="container hidden sm:flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
        <Link href='/' className="flex items-center text-2xl">
            <div className="w-12 mr-3">
                <Image src="/logo.png" alt="logo" className=" w-[500px]" width={500} height={500}/>
            </div>Houseek
        </Link>
        <div className="flex mt-4 sm:mt-0">
            <a className="px-4" href="#features">Contact Us</a>
            <Link className="px-4" href="/property">Properties</Link>
            <a className="px-4" href="#testimonials">About Us</a>
        </div>
        <div className="hidden md:block">
            <button type="button"
                className=" py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white "> Register
            </button>
        </div>
    </div>
    <div className="sm:hidden items-center mx-auto py-4 px-8">
     <FaBars className=" "/>
     </div>
</header>
  )
}

export default Navbar
