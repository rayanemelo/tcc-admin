'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Menu, Waves, X } from 'lucide-react';
import { ThemeToggle } from './components/theme-toggle';

const navItems = [
  { label: 'Análise de Alagamentos', href: '/alagamentos' },
  { label: 'Mapa', href: '/mapa' },
  { label: 'Notificações', href: '/notificacoes' },
  { label: 'Perguntas Frequentes', href: '/perguntas-frequentes' },
  { label: 'Suporte', href: '/suporte' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  function handleLogout() {
    setUserMenuOpen(false);
    setOpen(false);
    router.push('/');
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!userMenuRef.current) return;

      if (!userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/home"
          className="flex items-center gap-2"
          aria-label="Ir para a home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B6790]/10 text-[#3B6790] dark:bg-sky-300/15 dark:text-sky-300">
            <Waves className="h-5 w-5" />
          </span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                isActive(href)
                  ? 'text-[#3B6790] dark:text-sky-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Botão Mobile */}
        <button
          className="rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-200 dark:hover:bg-slate-800"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Usuário Desktop + Toggle */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="bg-[#3B6790] font-medium text-white">
                  AD
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Admin
              </span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-40 rounded-md border border-slate-200 bg-white p-1 shadow-md dark:border-slate-700 dark:bg-slate-800">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay Mobile */}
      {open && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-[120] h-lvh bg-slate-950/45 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed right-0 top-0 z-[130] h-dvh w-72 border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            {/* Header Mobile */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-[#3B6790] text-white">
                    AD
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  Admin
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navegação Mobile */}
            <nav className="flex flex-col px-4 py-6 bg-white dark:bg-slate-900">
              {navItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive(href)
                      ? 'bg-[#3B6790]/10 text-[#3B6790] dark:bg-sky-300/15 dark:text-sky-300'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Logout Mobile */}
            <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800">
              <button
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
