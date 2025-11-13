// AuthContext.tsx
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { 
    onAuthStateChanged, 
    signInWithPopup, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider 
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, provider } from "../FireBase.config";
import { useNavigate } from "react-router";

interface AuthContextType {
    user: User | null;
    loginGoogle: () => Promise<void>;
    loginEmail: (email: string, password: string) => Promise<void>;
    registerEmail: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("No me pasaste el context :(");
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ?? null);
        });
        return () => unsubscribe();
    }, []);

    const loginGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate("/"); 
    };

    const loginEmail = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
    };

    const registerEmail = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/"); 
    };

    const logout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, loginGoogle, loginEmail, registerEmail, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
