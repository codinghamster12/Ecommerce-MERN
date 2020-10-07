import React from 'react'
import MenuHeader from '../MenuHeader'
import Header from '../Header';

const Layout = (props) => {
    return (
        <>
        <Header/>
        <MenuHeader/>
        {props.children}
        </>
    )
}

export default Layout
