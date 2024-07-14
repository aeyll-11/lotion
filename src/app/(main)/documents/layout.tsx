'use client';

export default function DocumentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex w-full flex-col items-center justify-center">{children}</main>;
}
