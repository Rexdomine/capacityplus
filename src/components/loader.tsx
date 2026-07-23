'use client';

import { logo } from '@/assets';
import { IconLoader2 } from '@tabler/icons-react';
import Image from 'next/image';

export function CapacityPlusLoader() {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-8 bg-background'>
      {/* Logo */}
      <Image
        src={logo}
        alt='Capacity+ Logo'
        width={220}
        height={88}
        className='animate-logo-spin'
        priority
      />

      {/* Status text */}
      <span className='text-sm font-medium text-muted-foreground'>
        Hang tight, we’re getting things ready!
      </span>

      {/* Spinner */}
      <IconLoader2 className='h-8 w-8 animate-spin text-muted-foreground' />
    </div>
  );
}
