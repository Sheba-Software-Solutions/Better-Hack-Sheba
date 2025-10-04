import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />

      <motion.main
        className="min-h-screen flex items-center justify-center px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <div className="max-w-4xl w-full py-24 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.98 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
          >
            Secure Your Ethiopian Documents Globally
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-700"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          >
            Decentralized identity wallet enabling seamless verification of Ethiopian credentials anywhere in the world.
          </motion.p>

          <motion.div className="mt-10 flex items-center justify-center gap-4" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 } } }}>
            <Link to="/signup" className="px-6 py-3 bg-black text-white rounded-md font-medium">Get Started Free</Link>
            <Link to="/signin" className="px-6 py-3 border border-black rounded-md font-medium">Sign in</Link>
          </motion.div>

          <motion.div className="mt-12 text-sm text-gray-600 flex items-center justify-center gap-8" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.25 } } }}>
            <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border border-black" /> No Setup Required</div>
            <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border border-black" /> W3C Standards</div>
            <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border border-black" /> 100% Secure</div>
          </motion.div>
        </div>
      </motion.main>

      {/* Why Choose section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black">Why Choose Sheba Cred?</h2>
          <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">Built on cutting-edge Web3 technology to provide the most secure and accessible identity solution</p>

          <motion.div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ staggerChildren: 0.08 }}>
            <motion.div className="bg-white border border-gray-200 rounded-lg p-8 text-center" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              <div className="mx-auto h-12 w-12 rounded-full bg-black flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l2 4 4 .5-3 3 .8 4L12 12 6.2 13.5 7 9 4 6.5 8 6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Secure Storage</h3>
              <p className="mt-2 text-sm text-gray-600">Military-grade encryption for your identity documents</p>
            </motion.div>

            <motion.div className="bg-white border border-gray-200 rounded-lg p-8 text-center" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              <div className="mx-auto h-12 w-12 rounded-full bg-black flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l2 4 4 .5-3 3 .8 4L12 12 6.2 13.5 7 9 4 6.5 8 6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Decentralized</h3>
              <p className="mt-2 text-sm text-gray-600">Your data stays with you, no central authority</p>
            </motion.div>

            <motion.div className="bg-white border border-gray-200 rounded-lg p-8 text-center" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              <div className="mx-auto h-12 w-12 rounded-full bg-black flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l2 4 4 .5-3 3 .8 4L12 12 6.2 13.5 7 9 4 6.5 8 6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Instant Verification</h3>
              <p className="mt-2 text-sm text-gray-600">QR-based verification in seconds, anywhere in the world</p>
            </motion.div>

            <motion.div className="bg-white border border-gray-200 rounded-lg p-8 text-center" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              <div className="mx-auto h-12 w-12 rounded-full bg-black flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l2 4 4 .5-3 3 .8 4L12 12 6.2 13.5 7 9 4 6.5 8 6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Global Trust</h3>
              <p className="mt-2 text-sm text-gray-600">W3C standards enable worldwide recognition</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 className="text-3xl md:text-4xl font-extrabold text-black" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>How It Works</motion.h2>
          <motion.p className="mt-3 text-gray-600" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Simple, fast, and secure in three steps</motion.p>

          <motion.div className="mt-12 flex flex-col lg:flex-row items-center justify-between gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}>
            <motion.div className="flex-1 text-center" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
              <div className="mx-auto h-16 w-16 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold mb-4">1</div>
              <h3 className="font-semibold">Upload Documents</h3>
              <p className="mt-2 text-sm text-gray-600">Upload your Ethiopian credentials securely</p>
            </motion.div>

            <motion.div className="flex-1 text-center" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
              <div className="mx-auto h-16 w-16 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold mb-4">2</div>
              <h3 className="font-semibold">Get Verified</h3>
              <p className="mt-2 text-sm text-gray-600">OCR and AI-powered verification process</p>
            </motion.div>

            <motion.div className="flex-1 text-center" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
              <div className="mx-auto h-16 w-16 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold mb-4">3</div>
              <h3 className="font-semibold">Share with QR</h3>
              <p className="mt-2 text-sm text-gray-600">Generate QR codes for instant verification</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA band */}
      <motion.section className="w-full bg-black text-white py-16" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Secure Your Identity?</h2>
          <p className="mt-4 text-gray-200">Join thousands who trust Sheba Cred for secure document verification</p>
          <div className="mt-8">
            <a href="/signup" className="inline-block bg-white text-black py-3 px-6 rounded-md font-medium">Create Your Wallet Now</a>
          </div>
        </div>
      </motion.section>

      <footer className="w-full border-t border-gray-200 py-6 text-center text-sm text-gray-600">© {new Date().getFullYear()} Sheba — All rights reserved</footer>
    </div>
  )
}

export default Home
