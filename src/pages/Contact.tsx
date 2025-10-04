import React from 'react'
import ContactForm from '../components/ContactForm'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const Contact: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-black py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
          <div className="mx-auto h-10 w-10 rounded-md bg-black text-white flex items-center justify-center mb-4">💬</div>
          <h2 className="text-2xl font-extrabold">Get in Touch</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-8">
            <h3 className="font-semibold mb-4">Send us a Message</h3>
            <p className="text-sm text-gray-600 mb-6">Fill out the form below and we'll get back to you within 24 hours</p>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold">Email Us</h4>
              <p className="mt-2 text-sm text-gray-600">For general inquiries and support</p>
              <p className="mt-3 font-medium text-black">support@sheba-cred.app</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold">Frequently Asked Questions</h4>
              <div className="mt-3 text-sm text-gray-600 space-y-3">
                <div>
                  <p className="font-medium text-black">What are your support hours?</p>
                  <p>We respond to all inquiries within 24 hours, Monday through Friday.</p>
                </div>

                <div>
                  <p className="font-medium text-black">Do you offer phone support?</p>
                  <p>Currently, we provide support via email and our contact form. Phone support is coming soon.</p>
                </div>

                <div>
                  <p className="font-medium text-black">How can I report a bug?</p>
                  <p>Please use the contact form above and include "Bug Report" in your message with detailed steps to reproduce the issue.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold">Need Immediate Help?</h4>
              <p className="mt-2 text-sm text-gray-600">Check out our comprehensive documentation for quick answers to common questions.</p>
              <div className="mt-4">
                <Link to="/documentation" className="inline-block bg-black text-white py-2 px-4 rounded-md">View Documentation</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact
