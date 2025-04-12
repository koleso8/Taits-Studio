import React from 'react';
import { cn } from '@/lib/utils';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface Props {
    className?: string;
    white?: boolean;
}

export const SocialNav: React.FC<Props> = ({ className, white = false }) => {
    return (
        <nav className={cn('flex items-center justify-center gap-4', className)}>
            <Link href="/asd">
                <div
                    className={cn(
                        'w-9 h-9 p-1 rounded-full flex items-center justify-center group transition-all ease-linear duration-300',
                        white ? 'bg-white hover:bg-transparent ' : 'bg-GRAY hover:bg-transparent border-2 border-GRAY'
                    )}
                >
                    <Facebook
                        className={cn(
                            'transition-all ease-linear duration-300',
                            white ? 'text-[#F79EA1] group-hover:text-white ' : 'text-white group-hover:text-GRAY'
                        )}
                    />
                </div>
            </Link>
            <Link href="/asd">
                <div
                    className={cn(
                        'w-9 h-9 p-1 rounded-full flex items-center justify-center group transition-all ease-linear duration-300',
                        white ? 'bg-white hover:bg-transparent' : 'bg-GRAY hover:bg-transparent border-2 border-GRAY'
                    )}
                >
                    <Instagram
                        className={cn(
                            'transition-all ease-linear duration-300',
                            white ? 'text-[#F7A39F] group-hover:text-white' : 'text-white group-hover:text-GRAY'
                        )}
                    />
                </div>
            </Link>
            <Link href="/asd">
                <div
                    className={cn(
                        'w-9 h-9 p-1 rounded-full flex items-center justify-center group transition-all ease-linear duration-300',
                        white ? 'bg-white hover:bg-transparent' : 'bg-GRAY hover:bg-transparent border-2 border-GRAY'
                    )}
                >
                    <Linkedin
                        className={cn(
                            'transition-all ease-linear duration-300',
                            white ? 'text-[#F8AA9D] group-hover:text-white' : 'text-white group-hover:text-GRAY'
                        )}
                    />
                </div>
            </Link>
        </nav>
    );
};