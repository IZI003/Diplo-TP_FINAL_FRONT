import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowToPlay from "../components/HowToPlay";
import RegisterModal from "../components/RegisterModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import { useLocation } from "react-router-dom";

export default function Landing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenlogin, setModalOpenlogin] = useState(false);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  useEffect(() => {
    if (query.get("modal") === "login" || query.get("inv")) {
      setModalOpenlogin(true);
    }
  }, []);
  return (
    <>
      <Navbar onRegister={() => setModalOpen(true)} onLoginOpen={() => setModalOpenlogin(true)}/>
      <Hero onRegister={() => setModalOpen(true)} />
      <Features />
      <HowToPlay />

      <RegisterModal open={modalOpen} setOpen={setModalOpen}  setOpenlogin={setModalOpenlogin}  />
      <LoginModal open={modalOpenlogin} setOpen={setModalOpenlogin} setOpenRegister={setModalOpen}/>
      <Footer/>
    </>
  );
}
