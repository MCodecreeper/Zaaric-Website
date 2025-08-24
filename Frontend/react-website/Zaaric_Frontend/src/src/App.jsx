import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/navbar.jsx";
import Home from "../pages/Home/home.jsx";
import LoadingPage from "../Components/Loading/loading.jsx";
import { HelmetProvider, Helmet } from "react-helmet-async";
import './App.css';


// Automatically scroll to top on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}


function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Small delay ensures everything is rendered before scrolling
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);

      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [loading]);


  return (
    <div className="App">
      <BrowserRouter>
        <HelmetProvider>
          <Helmet>
            <title>Zaaric | Defining Your Digital Excellence</title>
            <meta
              name="description"
              content="Zaaric is a cutting-edge tech agency specializing in development, design, and editing. We craft innovative solutions that drive success."
            />
            <meta property="og:title" content="Zaaric | Powering Innovation, Crafting Solutions" />
            <meta property="og:image" content="https://zaaric.com/assets/meta-image.jpg" />
            <meta property="og:url" content="https://zaaric.com" />
          </Helmet>

          {loading ? (
            <LoadingPage setLoading={setLoading} />
          ) : (
            <div className="main-content">
              <ScrollToTop />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                {/* Add more routes here */}
              </Routes>
            </div>
          )}
        </HelmetProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
