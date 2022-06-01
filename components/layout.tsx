import * as React from 'react';
import Header from './header';

const Layout = ({children}: any) => {
 return(
   <>
    <Header />
    <main className="pt-16">{children}</main>
   </>
 )
}

export default Layout
