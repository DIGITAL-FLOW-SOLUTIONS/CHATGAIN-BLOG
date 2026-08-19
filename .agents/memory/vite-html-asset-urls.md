---
name: Vite HTML asset URLs
description: Static Vite HTML metadata URL behavior in this workspace
---

For this workspace's Vite static build, document-relative `./` values in HTML metadata can be interpreted as filesystem asset URLs and cause an `EISDIR` build failure when they resolve to the artifact directory. Public assets should use the existing root-relative convention such as `/og-image.svg`; domain-dependent canonical and `og:url` values should be added after the production domain is verified.

**Why:** The app is currently unpublished, and Vite's HTML asset processing rejected the relative metadata paths during the SEO build.

**How to apply:** Keep static asset references root-relative. Do not invent a production domain for canonical, sitemap, or structured-data URLs; obtain the published URL first.