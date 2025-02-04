'use client';

import { classNameMerge } from '@/utils/classNameMerge';
import { ChevronsRight, MenuIcon } from 'lucide-react';
import { useEffect, useRef, useState, type ElementRef } from 'react';

export default function Navigation(): JSX.Element {
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  useEffect(() => {
    if (isHovering) {
      setIsNavOpen(true);
      if (sidebarRef.current) {
        sidebarRef.current.style.transform = 'translateX(0)';
      }
    }
  }, [isHovering]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX < 20 && !isNavOpen) {
        setIsNavOpen(true);
        setIsHovering(true);
        if (sidebarRef.current) {
          sidebarRef.current.style.transform = 'translateX(0)';
        }
      }

      if (isNavOpen && sidebarRef.current) {
        const sidebarWidth = sidebarRef.current.getBoundingClientRect().width;

        if (event.clientX > sidebarWidth) {
          setIsNavOpen(false);
          setIsHovering(false);
          sidebarRef.current.style.transform = 'translateX(-100%)';
        }
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const fromElement = event.relatedTarget as HTMLElement;
      if (!fromElement) {
        // Mouse moved outside the window
        if (sidebarRef.current) {
          setIsNavOpen(false);
          setIsHovering(false);
          sidebarRef.current.style.transform = 'translateX(-100%)';
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isNavOpen]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={classNameMerge(
          'fixed top-52 z-30 flex h-fit w-[240px] flex-col rounded bg-default-100 p-4 shadow-md transition-transform duration-300',
          !isNavOpen && 'translate-x-full',
        )}
        style={{ transform: isNavOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <div role="button" className="flex justify-between">
          <p>Taguine Idriss</p>
        </div>
      </aside>
      <div ref={navbarRef} className={classNameMerge('transition-all duration-300 ease-in-out')}>
        <nav className="w-full px-3 py-2">
          <div
            onMouseLeave={handleMouseLeave}
            onMouseOver={handleMouseOver}
            className="rounded p-1 hover:bg-default-300"
            role="button"
          >
            {!isNavOpen ? (
              <MenuIcon className="h-5 w-5 opacity-50" role="button" />
            ) : (
              <ChevronsRight className="h-5 w-5 opacity-50" role="button" />
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
