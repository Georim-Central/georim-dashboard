# API Endpoints

---

## 🔴 High Priority

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events/:id/orders` | List all orders for an event (search + filter) |
| GET | `/orders/:id` | Get single order detail |
| PUT | `/orders/:id` | Update order (status, notes) |
| POST | `/orders/:id/refund` | Issue refund for an order |
| GET | `/events/:id/orders/export` | Export orders as CSV/PDF |

### Promo Codes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events/:id/promo-codes` | List promo codes for an event |
| POST | `/events/:id/promo-codes` | Create a promo code |
| PUT | `/promo-codes/:id` | Update promo code (scope, validity, limit, discount) |
| DELETE | `/promo-codes/:id` | Delete a promo code |

### Finance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/finance/payouts` | List payout history |
| POST | `/finance/payouts/schedule` | Schedule next payout |
| GET | `/finance/transactions` | List transactions (search + filter) |
| GET | `/finance/withdrawals` | List withdrawal requests |
| POST | `/finance/withdrawals` | Request a new withdrawal |
| GET | `/finance/invoices` | List platform invoices |
| GET | `/finance/invoices/:id/download` | Download invoice PDF |
| GET | `/finance/summary` | Get summary metrics (revenue, balance, pending) |

### Check-In
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/events/:id/check-in` | Submit a scan (QR code or manual) |
| GET | `/events/:id/check-ins` | List check-in records for an event |
| GET | `/events/:id/check-ins/stats` | Get check-in statistics (X of Y checked in) |

### Team Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/org/team` | List all team members |
| DELETE | `/org/team/:memberId` | Remove a team member |
| PUT | `/org/team/:memberId/role` | Update member role |
| GET | `/org/team/invites` | List pending invites |
| POST | `/org/team/invites` | Send team invite (email + role + event scope) |
| DELETE | `/org/team/invites/:inviteId` | Revoke a pending invite |
| POST | `/org/team/:memberId/special-tickets` | Assign special tickets to a member |

### Team Invite Flow
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/invites/:token` | Get invite details by token |
| POST | `/invites/:token/accept` | Accept an invite |
| POST | `/invites/:token/decline` | Decline an invite |
| POST | `/invites/:token/accept-role` | Accept the assigned role |
| POST | `/invites/:token/decline-role` | Decline the assigned role |

### Settings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/profile` | Get user profile |
| PUT | `/user/profile` | Update profile (name, email, phone, address, avatar) |
| PUT | `/user/password` | Change password |
| GET | `/user/sessions` | List active sessions |
| DELETE | `/user/sessions/:id` | Revoke a session |
| GET | `/user/2fa` | Get 2FA status |
| POST | `/user/2fa/enable` | Enable two-factor authentication |
| DELETE | `/user/2fa` | Disable two-factor authentication |
| GET | `/user/payment-methods` | List saved payment methods |
| POST | `/user/payment-methods` | Add a payment method |
| DELETE | `/user/payment-methods/:id` | Remove a payment method |
| PUT | `/user/payment-methods/:id/default` | Set default payment method |
| GET | `/user/subscription` | Get current subscription plan |
| PUT | `/user/subscription` | Upgrade or downgrade plan |
| GET | `/user/notification-preferences` | Get notification preferences |
| PUT | `/user/notification-preferences` | Update notification preferences |

---

## 🟡 Medium Priority

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analytics` | Org-level analytics (revenue, tickets, attendees, growth) |
| GET | `/analytics/events/:id` | Event-level analytics breakdown |
| GET | `/analytics/geography` | Attendee geography (top cities/states) |
| GET | `/analytics/export` | Export analytics report as PDF |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/metrics` | Aggregated dashboard metrics (events, attendees, revenue, growth) |

### Marketing Campaigns
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events/:id/marketing` | Get event marketing & discovery settings |
| PUT | `/events/:id/marketing` | Update marketing settings (status, geo-radius, push notifications) |
| GET | `/events/:id/campaigns` | List campaigns for an event |
| POST | `/events/:id/campaigns` | Create a campaign |
| PUT | `/campaigns/:id` | Update a campaign |
| DELETE | `/campaigns/:id` | Delete a campaign |
| GET | `/campaigns/:id/metrics` | Get campaign delivery and engagement metrics |
| GET | `/audience-segments` | List available audience segments with contact counts |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications` | List notifications (filter by category/read status) |
| PUT | `/notifications/:id/read` | Mark notification as read |
| PUT | `/notifications/read-all` | Mark all as read |
| PUT | `/notifications/:id/archive` | Archive a notification |
| GET | `/notifications/summary` | Get notification summary counts |

### Events (Core)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events` | List all events |
| POST | `/events` | Create a new event |
| GET | `/events/:id` | Get event details |
| PUT | `/events/:id` | Update event (details, description, dates, location) |
| DELETE | `/events/:id` | Delete an event |
| PUT | `/events/:id/status` | Update event lifecycle status (draft/published/private/archived) |
| POST | `/events/:id/duplicate` | Duplicate an event |

### Private Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/events/:id/visibility` | Toggle event public/private |
| POST | `/events/:id/private-link/reset` | Reset the private access link |

### Waitlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/events/:id/waitlist` | Enable or disable waitlist for an event |
| GET | `/events/:id/waitlist` | List waitlisted attendees |

### Recurring Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/events/:id/recurrence` | Set recurrence rule (daily/weekly/monthly/custom) |
| PUT | `/events/:id/recurrence` | Update recurrence rule |
| DELETE | `/events/:id/recurrence` | Remove recurrence |

### Global Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/search?q=` | Search across events, orders, attendees, and team members |

---

## 🟢 Low Priority

### Event Media
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/events/:id/media` | Upload photos or videos (up to 10) |
| DELETE | `/events/:id/media/:mediaId` | Remove a media item |
| PUT | `/events/:id/media/video-url` | Set external video URL |

### Cancellation Policy
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/events/:id/cancellation-policy` | Set or update cancellation policy text |

### AI Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/chat` | Send a message and receive an AI response |
| GET | `/ai/chat/history` | Retrieve chat message history |

### Help & Support
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/support/contact` | Submit a support contact form |
