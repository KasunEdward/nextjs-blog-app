// components/ProtectedRoute.tsx
import { ReactNode, ReactElement } from 'react';
import { useSession, SessionProvider } from 'next-auth/react'; // Import SessionProvider
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Define the types for the props
interface ProtectedRouteProps {
  children: ReactNode; // Children are the content that will be protected
  redirectTo?: string; // Optional redirection URL if not authenticated
  loadingComponent?: ReactElement; // Optional custom loading component
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/',
  loadingComponent = <div>Loading...</div>,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push(redirectTo); // Redirect to the specified URL if not authenticated
    }
  }, [session, status, router, redirectTo]);

  if (status === 'loading') {
    return loadingComponent; // Render custom loading component if provided
  }

  return session ? <>{children}</> : null; // If authenticated, render the children (protected content)
};

const ProtectedRouteWrapper: React.FC<ProtectedRouteProps> = (props) => (
  <SessionProvider>
    <ProtectedRoute {...props} />
  </SessionProvider>
);

export default ProtectedRouteWrapper;


