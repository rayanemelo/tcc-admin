'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Análise de Alagamentos', href: '/alagamentos' },
  { label: 'Mapa', href: '/mapa' },
  { label: 'Notificações', href: '/notificacoes' },
  { label: 'Perguntas Frequentes', href: '/perguntas-frequentes' },
  { label: 'Suporte', href: '/suporte' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-end md:justify-between px-6">
        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                isActive(href)
                  ? 'text-[#3B6790]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Botão Mobile */}
        <button
          className="md:hidden rounded-md p-2 hover:bg-gray-100"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </button>

        {/* Usuário Desktop */}
        <div className="relative hidden md:block group">
          <button className="flex items-center gap-2 rounded-full border p-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback className="bg-[#3B6790] text-white font-medium">
                AD
              </AvatarFallback>
            </Avatar>
            <span className="mr-2 text-sm font-medium text-gray-700">
              Admin
            </span>
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 hidden w-40 rounded-md border bg-white shadow-md group-hover:block">
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={() => {
                // logout()
              }}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Mobile */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg">
            {/* Header Mobile */}
            <div className="flex items-center justify-between border-b px-4 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-[#3B6790] text-white">
                    AD
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-800">Admin</span>
              </div>

              <button onClick={() => setOpen(false)} aria-label="Fechar menu">
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Navegação Mobile */}
            <nav className="flex flex-col px-4 py-6">
              {navItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive(href)
                      ? 'bg-[#3B6790]/10 text-[#3B6790]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Logout Mobile */}
            <div className="border-t px-4 py-4">
              <button
                className="flex w-full items-center gap-2 text-sm text-red-600 hover:bg-gray-100 rounded-md px-3 py-2"
                onClick={() => {
                  // logout()
                }}
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
