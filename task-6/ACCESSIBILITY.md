# Timeline Application Accessibility Conformance Report


## 1. Keyboard Accessibility and Focus Management

All interactive components are fully operable via a keyboard, ensuring users who cannot use a mouse can navigate and interact with the application effectively.

-   **Logical Focus Order**: The tab order follows the visual layout of the page logically, from the header to the filters and then through the timeline events.
-   **Visible Focus Indicators**: A clear, high-contrast focus ring (`outline: 3px solid var(--focus-ring-color)`) is applied to all focusable elements using the `:focus-visible` pseudo-class, benefiting all keyboard users.
-   **Interactive Elements**: All clickable elements, including timeline event cards, are implemented as accessible buttons (`role="button"`, `tabIndex={0}`) and are activatable using both `Enter` and `Space` keys.

## 2. Accessible Rich Internet Applications (ARIA)

ARIA attributes have been used to enhance the user experience for assistive technologies where semantic HTML alone is insufficient.

### 2.1. Event Cards (Timeline Markers)

-   **Role**: Each event card has `role="button"` to convey its interactive nature.
-   **Accessible Name**: A descriptive `aria-label` (e.g., "View details for The First Printing Press") provides context for screen reader users.

### 2.2. Modal Dialog

The event detail modal follows the ARIA Authoring Practices Guide for dialogs:

-   **Role**: The modal container has used  `dialog` and `aria-label` to inform assistive technologies that the content underneath is inert.
-   **Labeling**: The modal is labeled by its visible title using `aria-labelledby`.
-   **Focus Management**:
    -   **Focus on Open**: When the modal opens, focus is immediately moved to the "Close" button.
    -   **Focus Trapping**: Keyboard focus is trapped within the modal, preventing users from accidentally tabbing to the background content.
    -   **Focus on Close**: Upon closing the modal (via the "Close" button or the `Escape` key), focus is programmatically returned to the event card that triggered it.

## 3. Content and Perception

-   **Color Contrast**: The application's color palette was chosen to meet WCAG AA contrast ratio requirements for text and background colors, ensuring readability.
-   **Text Alternatives**: All meaningful images have descriptive `alt` text (e.g., the site logo). Decorative images within the modal have an empty `alt` attribute (`alt=""`) to be ignored by screen readers, as the information is provided in the adjacent text.
