import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { HiOutlineChatAlt2 } from 'react-icons/hi';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        process.env.service_4971e32,
        process.env.template_wzvkvps,
        formRef.current,
        process.env.Y82TUmytIytFav5NBm,
      );
      setLoading(false);
      alert('Thank you for your message. I will get back to you as soon as possible.');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert('Oops! Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white font-medium mb-4">
              Your Name
            </label>
            <div className="relative">
              <AiOutlineUser className="absolute top-4 left-4 text-white" />
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name"
                className="bg-tertiary py-4 px-12 text-white rounded-lg outline-none border-none font-medium"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white font-medium mb-4">
              Your Email
            </label>
            <div className="relative">
              <AiOutlineMail className="absolute top-4 left-4 text-white" />
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email"
                className="bg-tertiary py-4 px-12 text-white rounded-lg outline-none border-none font-medium"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-white font-medium mb-4">
              Your Message
            </label>
            <div className="relative">
              <HiOutlineChatAlt2 className="absolute top-4 left-4 text-white" />
              <textarea
                id="message"
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message here"
                className="bg-tertiary py-4 px-12 text-white rounded-lg outline-none border-none font-medium"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn('right', 'tween', 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
