"use client";

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      {/* Header Section */}
      <h1 className="text-4xl font-bold mb-4 text-[#D90429]">Contact Us</h1>
      <p className="text-lg text-gray-700">
        Have a question or need support? Get in touch with us and we&apos;ll be happy to help!
      </p>

      {/* Contact Info */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="text-[#D90429]" />
          <p>support@meetup.com</p>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Phone className="text-[#D90429]" />
          <p>+44 1234 567 890</p>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin className="text-[#D90429]" />
          <p>Leicester, UK</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-3 border rounded-md" required />
          <input type="email" placeholder="Your Email" className="p-3 border rounded-md" required />
          <textarea placeholder="Your Message" className="p-3 border rounded-md h-32" required />
          <button type="submit" className="px-6 py-3 bg-[#D90429] text-white rounded-lg shadow-md hover:bg-[#a7031f] transition">
            Send Message
          </button>
        </form>
      </div>

      {/* Map Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Our Location</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.668204834127!2d-1.1424313229910272!3d52.629839772090065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879ddcfc377f7cd%3A0xd91c9efcc41fdd79!2sDe%20Montfort%20University!5e0!3m2!1sen!2suk!4v1740936732445!5m2!1sen!2suk" 
        width="100%"
        height="300"
        className="rounded-lg shadow-md"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

      {/* Social Media */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
        <div className="flex justify-center gap-6 text-[#D90429]">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={30} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={30} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={30} /></a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
