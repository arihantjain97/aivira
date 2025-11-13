'use client';

'use client';

import Link from 'next/link';
import { Building2, Users, ShoppingCart } from 'lucide-react';
import { personas } from '@/lib/personas';

const personaConfig = {
  SME: {
    icon: Building2,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
  },
  Consultant: {
    icon: Users,
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
  },
  Vendor: {
    icon: ShoppingCart,
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600',
  },
};

export default function HowItWorksTeaser() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Why Aivira Works for You
          </h2>
          <p className="text-lg text-muted-foreground">
            Tailored solutions for every type of user in the grant ecosystem
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {Object.entries(personas).map(([key, val]) => {
            const displayName = val.name ?? key;
            return (
              <Link
                key={key}
                href={`/how-it-works?role=${key}`}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 block"
              >
                {/* Icon Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${personaConfig[key as keyof typeof personaConfig].color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {(() => {
                      const IconComponent = personaConfig[key as keyof typeof personaConfig].icon;
                      return <IconComponent className="w-6 h-6" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{displayName}</h3>
                    <div className={`h-1 w-12 bg-gradient-to-r ${personaConfig[key as keyof typeof personaConfig].gradient} rounded-full mt-1`} />
                  </div>
                </div>
                
                {/* Hero Text */}
                <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                  {val.hero}
                </p>
                
                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {val.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${personaConfig[key as keyof typeof personaConfig].color} mt-2 shrink-0`} />
                      <span className="text-sm text-gray-600 leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Link */}
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <span>{val.cta}</span>
                </div>
                
                {/* Subtle gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${personaConfig[key as keyof typeof personaConfig].gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}