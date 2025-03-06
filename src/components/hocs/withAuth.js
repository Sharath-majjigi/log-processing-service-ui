"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('access_token');
            const tokenExpiration = localStorage.getItem('tokenExpiration');

            if (!token || (tokenExpiration && Date.now() >= tokenExpiration)) {
                router.push('/login');
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthenticatedComponent;
};

export default withAuth;