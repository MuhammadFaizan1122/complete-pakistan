import "./globals.css";
import Layout from "../components/Layout/Layout";
import SessionWrapper from "../components/SessionWrapper/SessionWrapper";
import SocialSidebar from "../components/socialSidebar/socialSidebar";

export const metadata = {
  title: "Complete Pakistan",
  description: "Complete Pakistan",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <Layout>
            {children}
            <SocialSidebar />
          </Layout>
        </body>
      </html>
    </SessionWrapper>
  );
}
