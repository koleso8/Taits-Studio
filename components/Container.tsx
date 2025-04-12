import React from 'react';
import { cn } from '@/lib/utils';


interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<Props> = ({ className, children }) => {
    return (
        <div className={cn('w-[940px] mx-auto', className)}>
            {children}
        </div>
    );
};