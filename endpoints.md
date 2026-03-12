# API Endpoints

> ✅ = already exists in backend &nbsp;|&nbsp; ❌ = needs to be built
> All backend routes are prefixed with `/api/v1`

---

## 🔴 High Priority

### Orders
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/events/:id/orders` | List all orders for an event (search + filter) | ❌ |
| GET | `/orders/:id` | Get single order detail | ✅ `GET /order/{id}` |
| PUT | `/orders/:id` | Update order (status, notes) | ❌ |
| POST | `/orders/:id/refund` | Issue refund for an order | ✅ `POST /order/{id}/refund` |
| GET | `/events/:id/orders/export` | Export orders as CSV/PDF | ❌ |

### Promo Codes
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/events/:id/promo-codes` | List promo codes for an event | ❌ |
| POST | `/events/:id/promo-codes` | Create a promo code | ❌ |
| PUT | `/promo-codes/:id` | Update promo code (scope, validity, limit, discount) | ❌ |
| DELETE | `/promo-codes/:id` | Delete a promo code | ❌ |

### Finance
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/finance/payouts` | List payout history | ❌ |
| POST | `/finance/payouts/schedule` | Schedule next payout | ❌ |
| GET | `/finance/transactions` | List transactions (search + filter) | ❌ |
| GET | `/finance/withdrawals` | List withdrawal requests | ❌ |
| POST | `/finance/withdrawals` | Request a new withdrawal | ❌ |
| GET | `/finance/invoices` | List platform invoices | ❌ |
| GET | `/finance/invoices/:id/download` | Download invoice PDF | ❌ |
| GET | `/finance/summary` | Get summary metrics (revenue, balance, pending) | ❌ |

### Check-In
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/events/:id/check-in` | Submit a scan (QR code or manual) | ✅ `POST /ticketing/validate` |
| GET | `/events/:id/check-ins` | List check-in records for an event | ❌ |
| GET | `/events/:id/check-ins/stats` | Get check-in statistics (X of Y checked in) | ❌ |

### Team Management
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/org/team` | List all team members | ❌ |
| DELETE | `/org/team/:memberId` | Remove a team member | ❌ |
| PUT | `/org/team/:memberId/role` | Update member role | ❌ |
| GET | `/org/team/invites` | List pending invites | ❌ |
| POST | `/org/team/invites` | Send team invite (email + role + event scope) | ❌ |
| DELETE | `/org/team/invites/:inviteId` | Revoke a pending invite | ❌ |
| POST | `/org/team/:memberId/special-tickets` | Assign special tickets to a member | ❌ |

### Team Invite Flow
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/invites/:token` | Get invite details by token | ❌ |
| POST | `/invites/:token/accept` | Accept an invite | ❌ |
| POST | `/invites/:token/decline` | Decline an invite | ❌ |
| POST | `/invites/:token/accept-role` | Accept the assigned role | ❌ |
| POST | `/invites/:token/decline-role` | Decline the assigned role | ❌ |

### Settings
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/user/profile` | Get user profile | ✅ `GET /auth/me` |
| PUT | `/user/profile` | Update profile (name, email, phone, address, avatar) | ✅ `PATCH /user/profile` |
| PUT | `/user/password` | Change password | ✅ `PATCH /auth/change-password` |
| POST | `/user/avatar` | Upload profile avatar | ✅ `POST /user/avatar` |
| GET | `/user/sessions` | List active sessions | ❌ |
| DELETE | `/user/sessions/:id` | Revoke a session | ❌ |
| GET | `/user/2fa` | Get 2FA status | ❌ |
| POST | `/user/2fa/enable` | Enable two-factor authentication | ❌ |
| DELETE | `/user/2fa` | Disable two-factor authentication | ❌ |
| GET | `/user/payment-methods` | List saved payment methods | ❌ |
| POST | `/user/payment-methods` | Add a payment method | ❌ |
| DELETE | `/user/payment-methods/:id` | Remove a payment method | ❌ |
| PUT | `/user/payment-methods/:id/default` | Set default payment method | ❌ |
| GET | `/user/subscription` | Get current subscription plan | ❌ |
| PUT | `/user/subscription` | Upgrade or downgrade plan | ❌ |
| GET | `/user/notification-preferences` | Get notification preferences | ❌ |
| PUT | `/user/notification-preferences` | Update notification preferences | ❌ |

---

## 🟡 Medium Priority

### Analytics
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/analytics` | Org-level analytics (revenue, tickets, attendees, growth) | ❌ |
| GET | `/analytics/events/:id` | Event-level analytics breakdown | ❌ |
| GET | `/analytics/geography` | Attendee geography (top cities/states) | ❌ |
| GET | `/analytics/export` | Export analytics report as PDF | ❌ |

### Dashboard
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/dashboard/metrics` | Aggregated dashboard metrics (events, attendees, revenue, growth) | ❌ |

### Marketing Campaigns
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/events/:id/marketing` | Get event marketing & discovery settings | ❌ |
| PUT | `/events/:id/marketing` | Update marketing settings (status, geo-radius, push notifications) | ❌ |
| GET | `/events/:id/campaigns` | List campaigns for an event | ❌ |
| POST | `/events/:id/campaigns` | Create a campaign | ❌ |
| PUT | `/campaigns/:id` | Update a campaign | ❌ |
| DELETE | `/campaigns/:id` | Delete a campaign | ❌ |
| GET | `/campaigns/:id/metrics` | Get campaign delivery and engagement metrics | ❌ |
| GET | `/audience-segments` | List available audience segments with contact counts | ❌ |

### Notifications
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/notifications` | List notifications (filter by category/read status) | ❌ |
| PUT | `/notifications/:id/read` | Mark notification as read | ❌ |
| PUT | `/notifications/read-all` | Mark all as read | ❌ |
| PUT | `/notifications/:id/archive` | Archive a notification | ❌ |
| GET | `/notifications/summary` | Get notification summary counts | ❌ |

### Events (Core)
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/events` | List all events | ✅ `GET /event` |
| POST | `/events` | Create a new event | ✅ `POST /event` |
| GET | `/events/:id` | Get event details | ✅ `GET /event/{id}` |
| PUT | `/events/:id` | Update event (details, description, dates, location) | ✅ `PATCH /event/{id}` |
| DELETE | `/events/:id` | Delete an event | ✅ `DELETE /event/{id}` |
| PUT | `/events/:id/status` | Update event lifecycle status (draft/published/private/archived) | ❌ |
| POST | `/events/:id/duplicate` | Duplicate an event | ❌ |

### Private Events
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| PUT | `/events/:id/visibility` | Toggle event public/private | ❌ |
| POST | `/events/:id/private-link/reset` | Reset the private access link | ❌ |

### Waitlist
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| PUT | `/events/:id/waitlist/toggle` | Enable or disable waitlist for an event | ❌ |
| GET | `/events/:id/waitlist` | List waitlisted attendees | ✅ `GET /waitlist/event/{eventId}` |
| POST | `/events/:id/waitlist/join` | Join waitlist for a ticket type | ✅ `POST /waitlist/join` |
| DELETE | `/events/:id/waitlist/leave` | Leave the waitlist | ✅ `DELETE /waitlist/leave` |
| GET | `/waitlist/position/:ticketTypeId` | Check waitlist position | ✅ `GET /waitlist/position/{ticketTypeId}` |

### Recurring Events
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/events/:id/recurrence` | Set recurrence rule (daily/weekly/monthly/custom) | ❌ |
| PUT | `/events/:id/recurrence` | Update recurrence rule | ❌ |
| DELETE | `/events/:id/recurrence` | Remove recurrence | ❌ |

### Global Search
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/search?q=` | Search across events, orders, attendees, and team members | ❌ |

---

## 🟢 Low Priority

### Event Media
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/events/:id/cover` | Upload event cover image | ✅ `POST /event/{id}/cover` |
| POST | `/events/:id/media` | Upload additional photos/videos (up to 10) | ✅ `POST /storage/upload/images` |
| DELETE | `/events/:id/media/:mediaId` | Remove a media item | ❌ |
| PUT | `/events/:id/media/video-url` | Set external video URL | ❌ |

### Cancellation Policy
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| PUT | `/events/:id/cancellation-policy` | Set or update cancellation policy text | ❌ |

### AI Chat
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/ai/chat` | Send a message and receive an AI response | ❌ |
| GET | `/ai/chat/history` | Retrieve chat message history | ❌ |

### Help & Support
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/support/contact` | Submit a support contact form | ❌ |

---

## ✅ Already Built (Not in Todo)

These endpoints exist in the backend but were not part of the original todo scope.

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register/initiate` | Start registration — send verification code |
| POST | `/auth/register/verify` | Verify email with 6-digit code |
| POST | `/auth/register/complete` | Complete registration — set password |
| POST | `/auth/login` | Login step 1: validate credentials |
| POST | `/auth/login/verify` | Login step 2: verify 6-digit code |
| POST | `/auth/google` | Authenticate with Google |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout — revoke refresh token |
| POST | `/auth/resend-code` | Resend verification code |
| POST | `/auth/forgot-password` | Request password reset code |
| POST | `/auth/verify-reset-code` | Verify password reset code |
| POST | `/auth/reset-password` | Reset password with code |

### Ticketing (Ticket Types)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ticketing` | Create a ticket type |
| GET | `/ticketing/event/{eventId}` | List ticket types for an event |
| GET | `/ticketing/{id}` | Get ticket type details |
| PATCH | `/ticketing/{id}` | Update a ticket type |
| DELETE | `/ticketing/{id}` | Delete a ticket type |
| GET | `/ticketing/{id}/availability` | Check ticket availability |
| GET | `/ticketing/order/{orderId}/tickets` | Get tickets for an order |
| POST | `/ticketing/order/{orderId}/send` | Resend tickets to buyer |
| POST | `/ticketing/info` | Get ticket info |
| GET | `/ticketing/ticket/{ticketId}/qr` | Get QR code for a ticket |
| PATCH | `/ticketing/{id}/add-tickets` | Increase ticket quantity (organizer only) |

### Checkout & Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/checkout` | Initiate checkout session |
| DELETE | `/checkout/{sessionId}` | Cancel checkout session |
| POST | `/payment/webhook` | Handle payment provider webhook |

### RSVPs (Free Events)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/rsvps` | Create RSVP for a free event |
| DELETE | `/rsvps/{eventId}` | Cancel RSVP |
| GET | `/rsvps/my-rsvps` | Get current user's RSVPs |
| GET | `/rsvps/event/{eventId}` | Get event RSVPs (organizer only) |
| GET | `/rsvps/event/{eventId}/count` | Get RSVP count (public) |
| GET | `/rsvps/event/{eventId}/status` | Get RSVP status |
| POST | `/rsvps/info` | Get RSVP ticket info (organizer only) |
| POST | `/rsvps/validate` | Validate RSVP QR code (organizer only) |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/category` | Create a category |
| GET | `/category` | List all categories |
| GET | `/category/{id}` | Get category by ID |
| PATCH | `/category/{id}` | Update a category |
| DELETE | `/category/{id}` | Delete a category |
| POST | `/category/event/{eventId}` | Attach categories to an event |
| DELETE | `/category/event/{eventId}` | Remove all categories from an event |
| GET | `/category/event/{eventId}` | Get categories for an event |

### Reels
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reels` | Create a reel |
| GET | `/reels` | List all reels |
| GET | `/reels/user/{userId}` | Get reels by user |
| GET | `/reels/event/{eventId}` | Get reels for an event |
| GET | `/reels/trending` | Get trending reels |

### Storage
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/storage/upload/image` | Upload a single image |
| POST | `/storage/upload/images` | Upload multiple images |
| POST | `/storage/presigned-url` | Get a presigned upload URL |

### User (Admin / Internal)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user` | List all users |
| POST | `/user` | Create a user |
| GET | `/user/{id}` | Get user by ID |
| PATCH | `/user/{id}` | Update a user |
| DELETE | `/user/{id}` | Delete a user |
| PATCH | `/user/username` | Set or update username |
| GET | `/user/check-username/{username}` | Check username availability |
