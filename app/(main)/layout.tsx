import type { ReactNode } from 'react';

import Header from '@/components/header';

export const metadata = {
    title: 'Taits Studio - Креативна дизайн-агенція',
    description: 'Ми створюємо унікальний дизайн для кожного клієнта',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="uk">
            <body >
                <Header />
                {children}</body>
        </html>
    );
}