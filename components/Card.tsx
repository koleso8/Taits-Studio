import React from 'react';
import { cn } from '@/lib/utils';


interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<Props> = ({ className, children }) => {
    return (
        <div className={cn('bg-gradient-to-r from-[#f163b8] to-[#fee685] text-center text-white rounded-[23px]', className)}>
            {children}
        </div>
    );
};