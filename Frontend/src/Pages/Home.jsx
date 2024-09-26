import React from 'react';
import Header from "../Components/Header.jsx"
import Footer from "../Components/Footer.jsx"
import Searchbar from '../Components/Searchbar.jsx';
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
        <Header/>
        
        <Footer />
    </div>
  )
}
