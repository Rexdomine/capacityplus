'use client';
import { motion } from 'framer-motion';
import React from 'react';

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className='flex flex-col gap-6 pb-6 bg-background'
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className='p-6 rounded-2xl border border-border shadow-lg shadow-primary/10 max-w-xs w-full bg-card'
                  key={i}
                >
                  <div className='flex gap-1 mb-3'>
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className='text-accent text-sm'>
                        ★
                      </span>
                    ))}
                  </div>
                  <div className='text-sm text-foreground mb-4'>{text}</div>
                  <div className='flex items-center gap-3 pt-3 border-t border-border'>
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <div className='flex flex-col'>
                      <div className='font-semibold text-sm leading-5'>
                        {name}
                      </div>
                      <div className='leading-4 text-xs text-muted-foreground'>
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export const testimonials = [
  {
    text: 'Capacity+ reduced our administrative burden by 40%. Our team now focuses on patient care instead of paperwork.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    name: 'Dr. Sarah Johnson',
    role: 'GP Practice Director',
  },
  {
    text: 'The coaching program transformed how I approach leadership. I feel energized rather than burned out.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    name: 'James Mitchell',
    role: 'Pharmacy Manager',
  },
  {
    text: "Our practice visibility increased significantly. We're now the trusted healthcare partner in our community.",
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    name: 'Emma Chen',
    role: 'Practice Manager',
  },
  {
    text: 'The secure integration with our GP system was seamless. Patient safety improved dramatically.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    name: 'Dr. Michael Patel',
    role: 'Clinical Director',
  },
  {
    text: 'Our team productivity increased by 60% within the first month of implementation.',
    image:
      'https://images.unsplash.com/photo-1507001341519-fd274455a638?w=100&h=100&fit=crop',
    name: 'Lisa Anderson',
    role: 'Operations Lead',
  },
  {
    text: 'The support team went above and beyond. They truly understand healthcare workflows.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    name: 'David Thompson',
    role: 'IT Manager',
  },
  {
    text: 'Patient outcomes improved significantly thanks to better coordination between services.',
    image:
      'https://images.unsplash.com/photo-1534614776424-f2b604be3700?w=100&h=100&fit=crop',
    name: 'Dr. Aisha Kumar',
    role: 'Senior GP',
  },
  {
    text: 'The analytics dashboard gives us insights we never had before. Data-driven decisions made easy.',
    image:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop',
    name: 'Rachel Green',
    role: 'Practice Manager',
  },
  {
    text: 'Referral processing time cut from days to hours. Our patients are extremely satisfied.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    name: 'Dr. Ahmed Hassan',
    role: 'Pharmacy Director',
  },
];
