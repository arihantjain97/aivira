# Deployment Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration (IMPORTANT: Set this to your production domain)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Supabase OAuth Configuration

1. Go to your Supabase project dashboard
2. Navigate to Authentication > URL Configuration
3. Add your production domain to the Site URL
4. Add redirect URLs:
   - `https://your-domain.com/pilot/after`
   - `https://your-domain.com/auth/callback`

## Google OAuth Setup

1. In your Supabase project, go to Authentication > Providers
2. Enable Google provider
3. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `https://your-domain.com/pilot/after`

## Deployment Platforms

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `out`
4. Add environment variables in Netlify dashboard

### Vercel
1. Import your repository
2. Framework preset: Next.js
3. Build command: `npm run build`
4. Output directory: `out`
5. Add environment variables in Vercel dashboard

### GitHub Pages
1. Set up GitHub Actions for deployment
2. Add environment variables as GitHub secrets
3. Build and deploy to `gh-pages` branch

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test Google OAuth sign-in
- [ ] Check that redirects work properly
- [ ] Verify social media metadata
- [ ] Test responsive design on mobile
- [ ] Check console for any errors

## Troubleshooting

### Localhost Redirect Issue
If you see localhost URLs in production:
1. Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
2. Clear build cache: `rm -rf .next`
3. Rebuild: `npm run build`

### OAuth Errors
1. Verify Supabase project URL and keys
2. Check redirect URLs in Supabase dashboard
3. Ensure Google OAuth is properly configured

### Build Errors
1. Clear node_modules: `rm -rf node_modules package-lock.json`
2. Reinstall: `npm install`
3. Clear build cache: `rm -rf .next`
4. Rebuild: `npm run build` 