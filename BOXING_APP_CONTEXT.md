# Gloves Off - Project Context

## Project Overview
Gloves Off is a comprehensive boxing fan engagement platform that combines fight information, fighter profiles, social interaction, prediction competitions, and live fight participation through round-by-round voting.

## Technical Stack

### Frontend
- **Framework**: React 19 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **UI Components**: Custom component library
- **Icons**: React Icons (boxing-themed icons)
- **Animations**: Framer Motion

### Backend (Future Implementation)
- Node.js with Express/NestJS
- PostgreSQL for user data
- MongoDB for social features
- Redis for caching and sessions
- WebSockets for real-time features

## Key Features (MVP)
1. **Authentication System** (Current Focus)
   - Email/password registration and login
   - Social login integration
   - Profile creation with favorite fighters
   - Session management

2. **Fighter Profiles**
   - Comprehensive fighter information
   - Fight history and statistics
   - Follow functionality

3. **Prediction System**
   - Fight outcome predictions
   - Accuracy tracking
   - Leaderboards and rankings

4. **Social Features**
   - User posts and discussions
   - Comments and likes
   - Share predictions

5. **Live Fight Features**
   - Round-by-round voting
   - Community scorecards
   - Live chat

## Design Principles
- **Boxing-Themed**: Dark backgrounds with red/gold accents, boxing imagery
- **Mobile-First**: Responsive design for all devices
- **Performance**: Fast loading, optimized assets
- **Accessibility**: WCAG 2.1 compliant
- **User Experience**: Intuitive navigation, clear CTAs

## Folder Structure
```
src/
├── assets/          # Images, fonts, static files
├── components/      # Reusable UI components
│   ├── ui/         # Basic UI elements
│   └── common/     # Shared components
├── features/       # Feature-based modules
│   ├── auth/       # Authentication
│   ├── fighters/   # Fighter profiles
│   ├── predictions/# Prediction system
│   └── social/     # Social features
├── hooks/          # Custom React hooks
├── pages/          # Route pages
├── services/       # API services
├── store/          # Global state management
├── styles/         # Global styles
└── utils/          # Helper functions
```

## Development Phases

### Phase 1: Foundation (Current)
- [x] Project setup
- [ ] Authentication system
- [ ] Basic routing
- [ ] UI component library
- [ ] Mock API setup

### Phase 2: Core Features
- [ ] Fighter profiles
- [ ] Fight calendar
- [ ] Basic predictions
- [ ] User profiles

### Phase 3: Social & Engagement
- [ ] Social feed
- [ ] Comments system
- [ ] Prediction sharing
- [ ] Basic gamification

### Phase 4: Live Features
- [ ] Live voting
- [ ] Real-time chat
- [ ] Community scorecards
- [ ] Notifications

## Naming Conventions
- **Components**: PascalCase (e.g., `LoginForm`, `FighterCard`)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: Tailwind utilities + BEM for custom classes
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **API Endpoints**: kebab-case

## State Management Strategy
- **Zustand** for global state (auth, user preferences)
- **React Query** for server state (fighters, predictions)
- **Local state** for component-specific data
- **Context** for theme and feature flags

## Performance Goals
- Initial load: < 3 seconds
- Route transitions: < 500ms
- API responses: < 1 second
- 90+ Lighthouse score

## Security Considerations
- JWT token storage in httpOnly cookies
- Input validation on all forms
- XSS protection
- CSRF tokens
- Rate limiting
- Secure password requirements

## Testing Strategy
- Unit tests for utilities
- Component tests with React Testing Library
- Integration tests for auth flows
- E2E tests for critical paths
- 80% code coverage target