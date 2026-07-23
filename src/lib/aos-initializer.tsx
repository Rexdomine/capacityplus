'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const AOSInitializer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  return null;
};

export default AOSInitializer;
