# Fundora screens for the animated cover

Eight original PNG screen exports from the supplied [Fundora Figma file](https://www.figma.com/design/kp5K1NhUCRFixa4lgUtpd2/Fundora?node-id=0-1).

Open [contact-sheet.jpg](./contact-sheet.jpg) to compare all screens. See [screens.json](./screens.json) for exact dimensions, public asset paths and source node links.

| Asset | Content | Pixels |
| --- | --- | --- |
| [welcome.png](./welcome.png) | Branded onboarding screen with Together, we grow headline. | 430 × 932 |
| [home.png](./home.png) | Wallet dashboard with balance, upcoming dues and bottom navigation. | 430 × 932 |
| [groups.png](./groups.png) | Savings group list with Wagmi, Japan Trip and contribution buttons. | 430 × 956 |
| [group-details.png](./group-details.png) | Meeday group overview with member contribution status. | 430 × 956 |
| [group-activity.png](./group-activity.png) | Meeday group activity tab. | 430 × 956 |
| [contribution.png](./contribution.png) | Wagmi contribution amount form. | 430 × 932 |
| [contribution-review.png](./contribution-review.png) | Review a 2000 naira Wagmi contribution. | 430 × 932 |
| [contribution-success.png](./contribution-success.png) | Wagmi contribution confirmation and receipt. | 430 × 932 |

## Handoff to Claude

Use these local exports to build the Fundora app cover in the same style as the existing animated covers. The current component is `src/components/AppShowcase.jsx`, with styles in `src/components/AppShowcase.css`. Project configuration is in `src/data/projects.js`; target the entry with `slug: "fundora"` (the mobile app). The separate `fundora-website` entry is a different project.

Suggested coherent sequence:

1. `/fundora/home.png` — show the wallet, then select Group in the bottom navigation.
2. `/fundora/groups.png` — select Contribute on the first Wagmi card.
3. `/fundora/contribution.png` — tap Review contribution.
4. `/fundora/contribution-review.png` — tap Confirm contribution.
5. `/fundora/contribution-success.png` — hold the confirmation, then fade back to the home screen to loop.

The primary buttons on the contribution, review and success exports are centered at approximately `[50, 85.6]` in the component's percentage-based tap coordinates. Check the home and groups tap positions against the images when wiring the animation.

Optional alternatives:
- `welcome.png` provides a strong green/lime branded opening or static cover.
- `group-details.png` and `group-activity.png` form a matching Meeday members/activity pair. They show a different group from the Wagmi contribution flow, so use them as a separate sequence or montage.

The existing component accepts a `showcase.flow` array containing `screen`, optional `taps: [[xPercent, yPercent]]`, and `then` transitions such as `push`, `tab`, `pop` or `fade`. Existing project entries demonstrate backdrop and device configuration.

These exports preserve the Figma artwork and native dimensions. The group screens are 430 × 956; the others are 430 × 932. Account for that difference in the phone viewport. The PNGs are the animation source files; the contact sheet is only a selection reference.

Only assets and this handoff have been added. The Fundora showcase is ready for Claude to wire into the portfolio.

