import "./globals.css";
import TodoList from "@/components/todoList";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          <div className="grid place-content-center h-screen">
            <div className="flex gap-4 h-[80lvh]">
              <TodoList />
              {children}
            </div>
          </div>
        </body>
      </html>
    );
  }