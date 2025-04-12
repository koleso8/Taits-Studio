import React from 'react';
import { cn } from '@/lib/utils';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';


interface Props {
    className?: string;
}

export const SocialNav: React.FC<Props> = ({ className }) => {
    return (
        <nav className=" flex items-center justify-center gap-4">

            <Link href="/asd">
                <div className="w-9 h-9 p-1 rounded-full bg-GRAY flex items-center justify-center group hover:bg-transparent  transition-all ease-linear duration-300">
                    <Facebook className="text-white group-hover:text-GRAY transition-all ease-linear duration-300" />
                </div>
            </Link>
            <Link href="/asd">
                <div className="w-9 h-9 p-1 rounded-full bg-GRAY flex items-center justify-center group hover:bg-transparent  transition-all ease-linear duration-300">
                    <Instagram className="text-white group-hover:text-GRAY transition-all ease-linear duration-300" />
                </div>
            </Link>
            <Link href="/asd">
                <div className="w-9 h-9 p-1 rounded-full bg-GRAY flex items-center justify-center group hover:bg-transparent  transition-all ease-linear duration-300">
                    <Linkedin className="text-white group-hover:text-GRAY transition-all ease-linear duration-300" />
                </div>
            </Link>


        </nav>
    );
};