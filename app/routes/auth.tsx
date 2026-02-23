import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  [
    { title: "ResumeX- Login" },
    { name: "description", content: "Login to your ResumeX account" },
  ];
};

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated && next) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);
  return (
    <main className="h-screen overflow-hidden bg-[url('/images/bg-new2.jpg')] bg-cover bg-center">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex relative items-center justify-center p-10">
          <img
            src="/images/auth-illustration.png"
            alt="Resume Illustration"
            className="w-[80%] max-w-md drop-shadow-2xl z-10"
          />

          <div
            className="absolute top-16 left-10 
                  bg-white/80 backdrop-blur-md
                  px-4 py-3 rounded-xl shadow-lg
                  text-sm font-medium
                  animate-float"
          >
            ⭐ Resume Score:{" "}
            <span className="text-emerald-600 font-bold">85/100</span>
          </div>

          <div
            className="absolute bottom-20 right-16 
                  bg-white/80 backdrop-blur-md
                  px-4 py-3 rounded-xl shadow-lg
                  text-sm font-medium
                  animate-float delay-200"
          >
            🤖 AI Powered Analysis
          </div>

          <div
            className="absolute top-32 right-8 
                  bg-emerald-500 text-white
                  px-3 py-2 rounded-full text-xs shadow-md
                  animate-bounce"
          >
            New Feedback!
          </div>
        </div>

        {/* RIGHT SIDE AUTH CARD */}
        <div className="flex items-center justify-center p-6">
          <div className="gradient-border shadow-xl">
            <section className="flex flex-col gap-8 bg-white/90 backdrop-blur-md rounded-2xl p-10 w-full max-w-md">
              <div className="flex flex-col gap-2 text-center items-center">
                <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  Welcome
                </h1>
                <h2 className="text-gray-600">
                  Log in to continue your job journey
                </h2>
              </div>

              <div>
                {isLoading ? (
                  <button className="auth-button animate-pulse">
                    Signing you in...
                  </button>
                ) : auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    Sign Out
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    Sign In
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default auth;
