import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ReadingProgress } from "./components/ReadingProgress";
import { BackToTop } from "./components/BackToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ReadingProgress />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
