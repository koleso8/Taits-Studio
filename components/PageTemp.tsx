import React from 'react';
import { cn } from '@/lib/utils';


interface Props {
    children: React.ReactNode;
    className?: string;
}

export const PageTemp: React.FC<Props> = ({ className, children }) => {
    return (
        <section className={cn('min-h-page pt-11', className)}>
            {children}
        </section>
    );
};