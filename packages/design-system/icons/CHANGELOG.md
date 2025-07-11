# @medusajs/icons

## 2.8.6

## 2.8.5

## 2.8.4

## 2.8.3

## 2.8.2

## 2.8.1

## 2.8.0

## 2.7.1

## 2.7.0

### Patch Changes

- [#11734](https://github.com/medusajs/medusa/pull/11734) [`cc4c5c86e227a6693d53ea6b5b9e62d0a7c57fa2`](https://github.com/medusajs/medusa/commit/cc4c5c86e227a6693d53ea6b5b9e62d0a7c57fa2) Thanks [@kasperkristensen](https://github.com/kasperkristensen)! - chore(ui-preset,icons,dashboard): Sync with Figma, and update ArrowRight import

## 2.6.1

### Patch Changes

- [#11738](https://github.com/medusajs/medusa/pull/11738) [`3b470f41427e487c68f89b8ee8155de716ffe861`](https://github.com/medusajs/medusa/commit/3b470f41427e487c68f89b8ee8155de716ffe861) Thanks [@olivermrbl](https://github.com/olivermrbl)! - chore: Remove ranges on Medusa packages

## 2.6.0

## 2.5.1

### Patch Changes

- [#11414](https://github.com/medusajs/medusa/pull/11414) [`47edd01deec79b394552cea349f1e41b7b88723b`](https://github.com/medusajs/medusa/commit/47edd01deec79b394552cea349f1e41b7b88723b) Thanks [@kasperkristensen](https://github.com/kasperkristensen)! - fix(admin-vite-plugin,admin-bundler,ui,icons,dashboard,framework,types): Update Vite dependencies

## 2.5.0

### Patch Changes

- [#11361](https://github.com/medusajs/medusa/pull/11361) [`3dbef519d95cf694d06843cb694c0d2abdac2146`](https://github.com/medusajs/medusa/commit/3dbef519d95cf694d06843cb694c0d2abdac2146) Thanks [@kasperkristensen](https://github.com/kasperkristensen)! - fix(admin-vite-plugin,icons,ui,dashboard): Upgrade vitest in all packages and align Vite version

## 2.4.0

## 2.3.1

## 2.3.0

### Patch Changes

- [#10961](https://github.com/medusajs/medusa/pull/10961) [`2a25b4d95f2b7a4d53138718c94124f47f041b36`](https://github.com/medusajs/medusa/commit/2a25b4d95f2b7a4d53138718c94124f47f041b36) Thanks [@kasperkristensen](https://github.com/kasperkristensen)! - chore(icons,dashboard): Pull latest icons and update branch icon in category tree

## 2.2.0

### Patch Changes

- [#10458](https://github.com/medusajs/medusa/pull/10458) [`f7aaf2c8bb243c8478a943285628ba8eb331feb6`](https://github.com/medusajs/medusa/commit/f7aaf2c8bb243c8478a943285628ba8eb331feb6) Thanks [@kasperkristensen](https://github.com/kasperkristensen)! - chore(ui,icons): Add React 19/19-rc to peer dependencies

## 2.1.3

## 2.1.2

## 2.1.1

## 2.1.0

### Patch Changes

- [#10369](https://github.com/medusajs/medusa/pull/10369) [`94f6265dfc074969f2f141a19f2fc33a6ab96af1`](https://github.com/medusajs/medusa/commit/94f6265dfc074969f2f141a19f2fc33a6ab96af1) Thanks [@kasperkristensen](https://github.com/kasperkristensen)! - feat(ui,icons,ui-preset): Sync with latest changes from Figma, and fix Code components

## 2.0.7

## 2.0.6

## 2.0.5

## 2.0.4

## 2.0.3

## 2.0.2

## 2.0.1

## 2.0.0

### Major Changes

- [#7341](https://github.com/medusajs/medusa/pull/7341) [`2e42e053d4c9d5445d227bdc268c66713aad8e2e`](https://github.com/medusajs/medusa/commit/2e42e053d4c9d5445d227bdc268c66713aad8e2e) Thanks [@olivermrbl](https://github.com/olivermrbl)! - chore: Medusa 2.0

## 1.2.1

### Patch Changes

- [#6428](https://github.com/medusajs/medusa/pull/6428) [`44d43e8155`](https://github.com/medusajs/medusa/commit/44d43e8155d1b1ca0af5e900787411c7d0b027c0) Thanks [@kasperkristensen](https://github.com/kasperkristensen)! - feat(medusa,medusa-js,medusa-react,icons): Fixes GET /admin/products/:id/variants endpoint in the core, and medusa-js and medusa-react. Pulls latest icons from Figma into `@medusajs/icons`.

## 1.2.0

### Minor Changes

- [#6061](https://github.com/medusajs/medusa/pull/6061) [`a2c149e7e5`](https://github.com/medusajs/medusa/commit/a2c149e7e588a9ebf080b4b43472bdb5126ed981) Thanks [@kasperkristensen](https://github.com/kasperkristensen)! - feat(ui): Updates spacing and sizing of components. Introduces new `size` variants for some components, such as `Button`, `IconButton`, and `Avatar`. Change most `:focus` styles to `:focus-visible` styles, to prevenent focus styles from being visible when not needed, such as on button clicks.
  feat(ui-preset): Publishes latest updates to our design system styles, as well as adding new colors. Noticable changes include changing `ui-code-text-*` styles to `ui-code-fg-*` for better consistency.
  feat(icons): Updates the `LockClosedSolid` and `LockOpenSolid` icons, and introduces four new icons: `LockClosedSolidMini`, `TriangleLeftMini`, `TriangleRightMini`, and `TriangleMini`.

## 1.1.0

### Minor Changes

- 035fa72: feat(ui,ui-preset): Release 2.1.0

  ## `@medusajs/ui`

  - The styling of buttons, inputs, and the CommandBar has been adjusted to have a more consistent look and feel.
  - Fixed an issue that caused DropdownMenu.Content to overflow the viewport.
  - Fixed an issue with the DatePicker component where deleting a time segment would throw an error.
  - The Text component now accepts a `leading` prop to adjust the line height. It can be set to `normal` (default) or `compact`. This change in the API is fully backwards compatible.
  - Adds a new subcomponent to RadioGroup called RadioGroup.ChoiceBox. This component wraps the RadioGroup.Item component with a mandatory label and description.

  ## `@medusajs/ui-preset`

  - Updated several colors, shadows, and gradient effects.

  ## `@medusajs/icons`

  - Introduces 6 new icons: QuestionMark, SparklesMiniSolid, SparklesMini, ThumbDown, ThumbUp, and UserCircleMini.
  - There have been slight adjustments made to ArrowPathMini, EllipseBlueSolid, EllipseGreenSolid, EllipseGreySolid, EllipseOrangeSolid, EllipsePurpleSolid, and EllipseRedSolid.

## 1.0.1

### Patch Changes

- ef98084: feat(ui,icons,ui-preset): Update to Medusa UI, including new components, icons, and preset styles.

  # Changes in `@medusajs/ui`

  ## New components

  - `IconButton` - A button that only contains an icon.
  - `IconBadge` - A badge that only contains an icon.
  - `StatusBadge` - A badge component specifically designed to be used for displaying statuses.
  - `Tabs` - A tab component that can be used to switch between different views.
  - `ProgressTabs` - A tab component specifically designed to be used for building multi-step tasks.
  - `ProgressAccordion` - An accordion component specifically designed to be used for building multi-step tasks.
  - `CurrencyInput` - An input component that can be used to input currency values.
  - `CommandBar` - A component that can be used to display a list of keyboard commands omn the screen.
  - `CurrencyInput` - An input component that can be used to input currency values, such as prices.

  ## Breaking changes

  Several components have been reorganized to streamline their API. The following components have breaking changes:

  - Button - The `format` property has been removed. To create a Icon only button, use the new `IconButton` component.
  - Badge - The `format` property has been removed. To create a Icon only badge, use the new `IconBadge` component. The border radius of the component is now controlled using the new `rounded` property.
  - CodeBlock - The `hideLineNumbers` property has been moved to the `snippets` property. This allows users to control the visibility of line numbers on a per snippet basis.

  ## Other changes

  - The `z-index`'s of all components have been cleaned up to to make stacking portalled components easier.
  - `Table.Pagination` has been tweaked to ensure that it displays the correct number of pages when there is no data.
  - `Calendar` has been tweaked to prevent clicking a date from submitting any forms that precede it in the DOM.

  # Changes in `@medusajs/icons`

  ## New icons

  - `X`
  - `AcademicCap`
  - `Figma`
  - `Photo`
  - `PuzzleSolid`
  - `Text`

  # Changes in `@medusajs/ui-preset`

  Minor tweaks to colors, typography, and animations.

## 1.0.0

### Major Changes

- 8d31ce6: Release of the Medusa UI design system, includes three new packages: `@medusajs/ui` a set of React components, hooks, and utils; `@medusajs/icons` a set of React icons; `@medusajs/ui-preset` a Tailwind CSS preset containing Medusa UI design tokens.
