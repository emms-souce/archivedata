import React from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import LogoutModal from './logout';

const Navbar = () => {
    return (
        <div className='w-full  flex justify-between  shadow-4xl px-5 bg-blue-200 h-14 items-center py-3'>
           <p className='w-full text-gray-700 text-4xl font-bold'>Pannel d'Administration</p>
            <LogoutModal/>
        </div>
    );
};

export default Navbar;