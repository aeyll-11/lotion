"use client";

import { ChevronsRight, MenuIcon } from "lucide-react";
import { useEffect, useRef, useState, type ElementRef } from "react";
import { classNameMerge } from "../../../../../utils/classNameMerge";

export default function Navigation(): JSX.Element {
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(false);
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
  };

  useEffect(() => {
    if (isHovering) {
      setIsNavOpen(true);
      if (sidebarRef.current) {
        sidebarRef.current.style.transform = "translateX(0)";
      }
    }
  }, [isHovering]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isNavOpen && sidebarRef.current) {
        const sidebarWidth = sidebarRef.current.getBoundingClientRect().width;
        if (event.clientX > sidebarWidth) {
          setIsNavOpen(false);
          setIsHovering(false);
          sidebarRef.current.style.transform = "translateX(-100%)";
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isNavOpen]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={classNameMerge(
          "bg-white rounded shadow-md h-fit flex flex-col fixed top-52 w-[240px] p-4 transition-transform duration-300",
          !isNavOpen && "translate-x-full"
        )}
        style={{ transform: isNavOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div role="button" className="flex justify-between">
          <p>Taguine Idriss</p>
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={classNameMerge(
          isResetting && "transition-all ease-in-out duration-300"
        )}
      >
        <nav className="w-full px-3 py-2">
          <div
            onMouseLeave={handleMouseLeave}
            onMouseOver={handleMouseOver}
            className="hover:bg-default-300 rounded p-1"
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
