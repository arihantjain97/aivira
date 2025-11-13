'use client';

import React from 'react';
import Link from 'next/link';
import { footerLinks, companyInfo } from '@/lib/constants';
import { MonitorSmartphone, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and contact info */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <MonitorSmartphone className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Aivira</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              AI-powered grant automation for Singapore SMEs. Simplifying access to government funding.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href={`mailto:${companyInfo.email}`} className="text-muted-foreground hover:text-primary">
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href={`tel:${companyInfo.phone}`} className="text-muted-foreground hover:text-primary">
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {companyInfo.address}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="md:col-span-2">
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-2">
              Subscribe to our newsletter for the latest grant opportunities and platform updates.
            </p>
            <form className="flex mt-2">
              <input 
                type="email"
                placeholder="Your email address"
                className="w-full max-w-xs px-3 py-2 rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 rounded-r-md hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {currentYear} {companyInfo.name}. All rights reserved. UEN: {companyInfo.uen}
          </div>
        </div>
      </div>
    </footer>
  );
}