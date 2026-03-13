# Typography Spec

Global font family:

- `"SF Pro Display", "SF Pro Text", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`

Core scale:

| Role | Size | Line Height | Weight | CSS Class | Typical Usage |
| --- | --- | --- | --- | --- | --- |
| Hero | 52px | 60px | 900 | `ui-type-hero` | Main landing page headlines |
| Section Header | 30px | 40px | 700 | `ui-type-section` | Major page sections |
| Card Header | 20px | 28px | 600 | `ui-type-card` | Title inside a container/card |
| Input / UI Text | 16px | 24px | 500 | `ui-type-ui` | Dropdowns, text fields, buttons |
| Subsection Title | 14px | 20px | 500 | `ui-type-subsection` | Form labels, small sidebars |
| Body / Meta | 12px | 16px | 400 | `ui-type-meta` | Captions, timestamps, footer links |

Utility mapping:

| Existing Utility | Effective Size |
| --- | --- |
| `text-3xl` | 52px |
| `text-2xl` | 30px |
| `text-xl` | 20px |
| `text-lg` | 20px |
| `text-base` | 16px |
| `text-sm` | 14px |
| `text-xs` | 12px |

Weight mapping:

| Utility | Weight |
| --- | --- |
| `font-bold` | 700 |
| `font-semibold` | 600 |
| `font-medium` | 500 |
| default body/meta | 400 |

Notes:

- Prefer the `ui-type-*` classes for new UI.
- Use inline pixel font sizes only when a layout has a strong visual reason to diverge.
- If a custom class uses `text-[11px]`, it is normalized globally to the 12px meta scale.
