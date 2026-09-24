# Third-party components

This portfolio includes source adaptations from the two projects requested by the owner.

## Motion Primitives

- Source: https://github.com/ibelick/motion-primitives
- Components: `text-effect`, `magnetic`, and `spotlight` from `components/core/`.
- License: MIT, copyright 2024 ibelick; full notice in `LICENSES/motion-primitives.txt`.
- Local changes: reduced-motion behavior and coarse-pointer guards for interactive effects, theme-specific styling, and text staggering updated for the current Motion API.

## Watermelon Platform

- Source: https://github.com/WatermelonCorp/watermelon-platform
- Sources: `src/data/contents/animated-components/shimmer-button/base.tsx`, `copy-confirm/base.tsx`, and `fluid-tabs/base.tsx`.
- License: MIT, copyright 2026 Watermelon Platform Contributors; full notice in `LICENSES/watermelon-platform.txt`.
- Local changes: shimmer button adapted to semantic links; clipboard feedback adds error handling and reduced-motion behavior; the fluid tab highlight is composed inside the existing accessible Base UI tabs instead of replacing their keyboard behavior. Motion imports use `motion/react`.

Retrieved 24 September 2026. These are editable source components, not a dependency on the Watermelon browsing platform or a hosted third-party backend.

- `public/images/anmol-avatar.png` is the owner's public GitHub avatar, downloaded from https://avatars.githubusercontent.com/u/181912258?v=4. It is an identicon, not a personal photograph.
