🌸 Detailed Instructions: Jay Mahakali Flowers Homepage
🎨 Design System
Color Palette (Indian Wedding Theme):

Primary: Rich Maroon/Crimson hsl(350, 75%, 40%)
Secondary: Deep Plum/Purple hsl(315, 50%, 30%)
Accent: Dusty Rose hsl(340, 30%, 60%)
Highlight: Hot Pink hsl(350, 80%, 55%)
Wine: hsl(340, 55%, 35%)
Gold: hsl(43, 74%, 49%) (for premium accents)
Background: Soft cream hsl(20, 20%, 98%)
Typography:

Headings: Playfair Display (serif, decorative, 400-700 weights)
Body: Lato (sans-serif, 300-700 weights)
Design Language:

Elegant, premium, festive Indian wedding aesthetic
Rounded corners (0.75rem base radius)
Soft shadows with maroon tint
Gradient overlays (maroon → plum)
Gold decorative dividers (24px wide, 4px tall pills)
📐 Section-by-Section Breakdown

1. Sticky Navbar
   Transparent on top of hero, becomes white/blur on scroll
   Logo: "Jay Mahakali" (maroon) + "Flowers" (gold), Playfair font
   Links: Home, About, Services, Gallery, Reviews, Contact
   CTA button: "Call Now" with phone icon
   Mobile: hamburger → animated slide-down menu
   Underline hover effect (gold, slides in from left)

2. Hero Section (full viewport height)
   Background: Indian wedding floral image with maroon-to-plum gradient overlay (80% opacity)
   Floating blurred circles (gold + pink) with subtle up/down animation
   Badge: "✨ Premium Floral Decorations" (gold pill)
   H1: "Jay Mahakali Flowers" (Flowers in gold), 7xl on desktop
   Italic tagline: "Turning Moments into Beautiful Memories"
   Description paragraph
   Two CTAs: "View Our Decorations" (gold solid) + "Book a Decoration" (outline)
   Animated scroll indicator at bottom (bouncing dot in pill)
   Stagger fade-in animations (0.3s → 0.7s delays)

3. About Section
   Two-column layout (content + stats grid)
   Left: "About Us" badge, heading with gradient accent word, story paragraphs, tag pills (✨ Creative, 🌸 Fresh, 💝 Personal)
   Right: 2x2 stats grid with icon cards
   15+ Years Experience (Clock)
   5000+ Happy Clients (Users)
   10000+ Events (Heart)
   100% Satisfaction (Award)
   Icon hover: scales + fills with maroon
   Subtle floral SVG background pattern

4. Services Section (muted background)
   Centered header with badge, gold divider
   3-column grid (2 on tablet, 1 on mobile) of 7 service cards:
   Wedding Decoration (Heart)
   Corporate Events (Building)
   Car Decoration (Car)
   Room Decoration (Home)
   Event Decoration (Party Popper)
   Custom Floral Design (Flower)
   Haldi & Mehndi (Sparkles)
   Card: colored icon box (16x16), title, description
   Hover: lift up 2px, shadow grows, icon scales

5. Gallery Section
   Category filter pills: All, Wedding, Stage, Car, Room, Event
   3-column masonry-style grid, 4:3 aspect ratio images
   Hover overlay: gradient from bottom, shows category + title, gold zoom icon top-right
   Click → full-screen lightbox modal with backdrop blur
   Framer Motion AnimatePresence for filter transitions

6. Testimonials Section
   2-column grid of review cards
   Each card: 5 gold stars, italic quote, initial-avatar + name + city
   Floating gold Quote icon in top-right corner (rotates/fills on hover)
   Indian customer names (Rahul Patel, Neha Shah, Amit Joshi, Pooja Mehta)

7. Why Choose Us Section (dark plum background)
   Decorative circles in gold outlines (background)
   3-column grid of 6 features:
   Experienced Decorators, Fresh Flowers, Affordable, On-Time, Custom Designs, 100% Satisfaction
   Icon in rounded square (gold on hover)
   Text in gold accent color

8. Contact Section
   2-column split: contact info cards (left) + form (right, 3/5 width)
   Info cards: Phone, WhatsApp, Location, Working Hours
   Form fields: Name, Phone, Event Type (dropdown), Event Date, Message
   Two submit buttons: "Send Inquiry" (maroon) + "WhatsApp Booking" (green)
   Zod validation, Sonner toast notifications

9. Footer (dark plum)
   3 columns: Brand + social icons, Quick Links, Services list
   Social buttons: circular, fill with gold on hover
   Copyright + "Made with ❤️ in India"

10. Floating WhatsApp Button
    Fixed bottom-right, green circle with message icon
    Pulse-glow animation + ping effect
    Opens WhatsApp with pre-filled message

🎬 Animation Principles
Fade-up on scroll (30-40px offset)
Stagger children by 0.1s
Duration 0.5-0.8s, ease-out
Hover: -translate-y-2, scale 1.1 for icons
Only animate once (once: true in useInView)
