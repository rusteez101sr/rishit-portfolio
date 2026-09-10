"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

function normalizePath(pathname: string) {
  // Strip basePath if present in pathname (Next usually omits it from usePathname)
  const base = "/rishit-portfolio";
  let path = pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path || "/";
}

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const path = normalizePath(pathname);
  const workActive = path === "/" || path.startsWith("/work");
  const infoActive = path === "/info" || path.startsWith("/info/");
  const linkedIn = site.socials.find((s) => s.label.toLowerCase() === "linkedin");
  const resume = site.resume;

  return (
    <header className="site-nav" role="banner">
      <div className="site-nav__inner">
        <Link href="/" className="site-nav__brand" aria-label={`${site.name} — home`}>
          <span className="site-nav__name">{site.name}</span>
          <span className="site-nav__role">Computer Engineer</span>
        </Link>

        <nav className="site-nav__pill" aria-label="Primary">
          <Link
            href="/"
            className={["site-nav__pill-link", workActive ? "is-active" : ""]
              .filter(Boolean)
              .join(" ")}
            aria-current={workActive ? "page" : undefined}
          >
            Work
          </Link>
          <Link
            href="/info"
            className={["site-nav__pill-link", infoActive ? "is-active" : ""]
              .filter(Boolean)
              .join(" ")}
            aria-current={infoActive ? "page" : undefined}
          >
            Info
          </Link>
        </nav>

        <div className="site-nav__links">
          {linkedIn ? (
            <a
              href={linkedIn.href}
              className="site-nav__ext site-nav__underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn ↗
            </a>
          ) : null}
          {resume ? (
            <a
              href={resume}
              className="site-nav__ext site-nav__underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Resume ↗
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
