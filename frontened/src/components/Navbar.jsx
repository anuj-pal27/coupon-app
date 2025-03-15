import React from 'react'
import {Link } from 'react-router-dom';

const Navbar = ()=>{
    return (
        <nav className='bg-blue-600 text-white py-4 px-6 flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>CouponApp</h1>
            <div className='space-x-4'>
                <Link to="/" className='hover:underline'>Home</Link>
                <Link to="/claim" className='hover:underline'>Claim Coupon</Link>
                <Link to="/admin" className='hover:underline'>Admin Login</Link>
            </div>
        </nav>
    )
}

export default Navbar;