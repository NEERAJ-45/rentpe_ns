// import { createContext, useContext, ReactNode, useState } from "react";

// type User = {
//   id: string;
//   email: string;
//   role: "user" | "vendor" | "admin";
// };

// type AuthContextType = {
//   user: User | null;
//   login: (email: string, password: string) => void;
//   logout: () => void;
//   isLoading: boolean;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   // For development, set a dummy user by default
//   const [user, setUser] = useState<User>({
//     id: "dev-user",
//     email: "dev@example.com",
//     role: "vendor", // or "user" / "vendor" depending on what you want to test
//   });

//   const isLoading = false; // Always false in dev mode

//   const login = (_email: string, _password: string) => {
//     // No-op: already have dummy user
//   };

//   const logout = () => {
//     // No-op: keep dummy user
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };
