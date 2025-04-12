import type { ReactNode } from 'react';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { PageTemp } from '@/components/PageTemp';
import { Container } from '@/components/Container';

export const metadata = {
    title: 'Taits Studio - Креативна дизайн-агенція',
    description: 'Ми створюємо унікальний дизайн для кожного клієнта',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <main className=' flex flex-col justify-between bg-white bg-custom-png bg-top bg-no-repeat bg-cover' >
            <Header />
            <Container>
                <PageTemp>
                    {children}
                </PageTemp>
                <Footer />
            </Container>
        </main>
    );
}