import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden'>
      <Header />

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='bg-gradient-to-br from-primary/10 to-transparent py-16 sm:py-24'>
          <div
            className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
            data-aos='fade-up'
          >
            <h1 className='text-4xl sm:text-5xl font-bold tracking-tight mb-4'>
              Get in Touch
            </h1>
            <p className='text-xl text-muted-foreground'>
              Book a call or reach out with any questions. We're here to help.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className='py-16 sm:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              {/* Contact Form */}
              <div data-aos='fade-right'>
                <h2 className='text-2xl font-bold mb-6'>Send us a message</h2>
                <form className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      placeholder='Your name'
                      className='w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Email
                    </label>
                    <input
                      type='email'
                      placeholder='your@email.com'
                      className='w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Phone (Optional)
                    </label>
                    <input
                      type='tel'
                      placeholder='+44 (0)...'
                      className='w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Which service interests you?
                    </label>
                    <select className='w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'>
                      <option>Digital GP-Pharmacy Integration</option>
                      <option>Life & Leadership Coaching</option>
                      <option>Social Media & Visibility</option>
                      <option>Multiple services</option>
                      <option>General inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Message
                    </label>
                    <textarea
                      placeholder='Tell us about your needs...'
                      rows={5}
                      className='w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none'
                    ></textarea>
                  </div>
                  <button
                    type='submit'
                    className='w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium'
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div data-aos='fade-left'>
                <h2 className='text-2xl font-bold mb-6'>Contact Information</h2>
                <div className='space-y-6'>
                  <div className='flex gap-4'>
                    <Mail className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                    <div>
                      <h3 className='font-bold mb-1'>Email</h3>
                      <a
                        href='mailto:os@jemedicalassociates.com'
                        className='text-primary hover:underline'
                      >
                        os@jemedicalassociates.com
                      </a>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <Phone className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                    <div>
                      <h3 className='font-bold mb-1'>Phone</h3>
                      <p className='text-muted-foreground'>
                        Available during UK business hours
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <Clock className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                    <div>
                      <h3 className='font-bold mb-1'>Booking Hours</h3>
                      <ul className='text-muted-foreground space-y-1 text-sm'>
                        <li>
                          <strong>Morning:</strong> 8:00 AM - 12:00 PM
                        </li>
                        <li>
                          <strong>Afternoon:</strong> 1:00 PM - 5:00 PM
                        </li>
                        <li>Monday - Friday</li>
                      </ul>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <MapPin className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                    <div>
                      <h3 className='font-bold mb-1'>Location</h3>
                      <p className='text-muted-foreground'>
                        United Kingdom
                        <br />
                        <small className='text-xs'>
                          Virtual consultations available worldwide
                        </small>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Booking */}
                <div className='mt-8 p-6 bg-muted/50 border border-border rounded-lg'>
                  <h3 className='font-bold mb-3'>Quick Availability</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Preferred meeting times: Morning (8am-12pm) or Afternoon
                    (1pm-5pm)
                  </p>
                  <button className='w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm'>
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='py-16 sm:py-24 bg-muted/20'>
          <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
            <div data-aos='fade-up' className='mb-8'>
              <h2 className='text-2xl font-bold'>Frequently Asked Questions</h2>
            </div>
            <div className='space-y-4'>
              <div
                className='bg-card border border-border rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='0'
              >
                <h3 className='font-bold mb-2'>
                  How long is an initial consultation?
                </h3>
                <p className='text-muted-foreground text-sm'>
                  Initial consultations typically last 30-45 minutes. We'll
                  explore your specific needs and discuss which services might
                  be the best fit.
                </p>
              </div>
              <div
                className='bg-card border border-border rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                <h3 className='font-bold mb-2'>
                  What's the next step after booking?
                </h3>
                <p className='text-muted-foreground text-sm'>
                  After you book, we'll send you a calendar invite and a brief
                  intake form to help us prepare for our conversation.
                </p>
              </div>
              <div
                className='bg-card border border-border rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                <h3 className='font-bold mb-2'>Can we meet virtually?</h3>
                <p className='text-muted-foreground text-sm'>
                  Absolutely. All consultations are conducted virtually via
                  video call, making it convenient for busy healthcare
                  professionals.
                </p>
              </div>
              <div
                className='bg-card border border-border rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                <h3 className='font-bold mb-2'>How quickly can we start?</h3>
                <p className='text-muted-foreground text-sm'>
                  Depending on your needs, we can often begin work within 1-2
                  weeks of your initial consultation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
