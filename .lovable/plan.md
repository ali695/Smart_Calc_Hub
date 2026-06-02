## Goal
Make the admin setup and CMS dashboard work properly on the live domain `https://smartcalhub.online/`.

## What I found
- `/auth` works on the live domain.
- `/admin` exists but only shows the old admin dashboard permission message.
- `/admin/setup` and `/admin/cms` return the app’s 404 page on the live domain, which means the published live build does not yet include the newer CMS/setup routes.
- The auth page currently ignores `?redirect=/admin/setup`, so after signing in from setup it would send users back to `/` instead of returning to setup.
- The auth page shows GitHub sign-in, but Lovable Cloud does not support GitHub OAuth natively; this can fail and confuse setup.

## Plan
1. **Make `/admin` the reliable entry point**
   - Replace the old `/admin` dashboard route with a small redirect/entry page.
   - If no first admin exists, send the user to `/admin/setup`.
   - If the user is already an admin/editor, send them to `/admin/cms`.
   - If an admin exists but the current user has no role, send them to `/auth?redirect=/admin` or show a clear access message.

2. **Fix login redirect behavior**
   - Update `/auth` to honor the `redirect` query parameter after email/password login.
   - Update signup and OAuth redirect URLs so the user returns to the intended admin/setup path instead of the homepage.

3. **Clean up unsupported OAuth**
   - Remove the GitHub sign-in button and related code so only supported sign-in options are shown.
   - Keep email/password and Google sign-in.

4. **Harden admin setup flow**
   - Ensure `/admin/setup` uses the current live origin for redirects.
   - After “Make me admin,” refresh roles and route directly into `/admin/cms`.
   - Show clear messages for: not signed in, first admin available, admin already configured, and claim failure.

5. **Verify live behavior path**
   - Check that the routes exist locally after changes.
   - After you publish/update the frontend, the live domain should work at:
     - `https://smartcalhub.online/admin`
     - `https://smartcalhub.online/admin/setup`
     - `https://smartcalhub.online/admin/cms`

## Important note
Frontend route changes only go live after publishing/updating the site. The current 404 on `smartcalhub.online/admin/setup` strongly indicates the live frontend hasn’t received the latest route changes yet, so I’ll make `/admin` robust and then you’ll need to click **Publish / Update** for the live domain.