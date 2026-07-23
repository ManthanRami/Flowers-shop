Role: Expert Senior Frontend Engineer & UI/UX Designer (Luxury Specialist) Project: "Jay Mahakali Flowers" - Premier Florist Portfolio Tech Stack: SvelteKit (TypeScript), Tailwind CSS v4, GSAP (ScrollTrigger), Sanity.io (Headless CMS pattern).

Task: Generate a complete, high-performance landing page for a luxury florist in Gujarat, India. The design must be "Grand, Cinematic, and Culturally Rich," balancing traditional Indian aesthetics with modern web luxury.

1. Design System & Branding

   Brand Name: Jay Mahakali Flowers

   Color Palette:

        Primary: Deep Maroon (#800000) - Use for backgrounds, heavy text, and footer.

        Accent: Metallic Gold (#D4AF37) - Use for buttons, borders, and subheadings.

        Base: Brand Cream (#F9F9F5) - Use for section backgrounds to avoid stark white.

        Text: Dark Grey (#1a1a1a) for readability, White for dark backgrounds.

   Typography:

        Headings: Playfair Display (Serif) - Elegant, high-contrast.

        Body: Lato (Sans-serif) - Clean, legible.

   Visual Style: "Glassmorphism" overlays, deep gradients (to-t from-black/90), and generous whitespace.

2. Component Architecture (SvelteKit)

A. The Hero Section (Cinematic Entrance)

    Layout: Full viewport height (100vh).

    Background: A high-quality, full-screen image of a "Grand Wedding Mandap" (use a placeholder). Apply a cinematic vignette overlay (radial-gradient) so text is legible.

    Content:

        Center-aligned text.

        Headline: "Where Tradition Blooms into Art" (Playfair Display, 5xl, White with Drop Shadow).

        Subhead: "Premier Wedding & Event Decor Across Gujarat."

    Animation: GSAP ScrollTrigger to pin the video/image and create a parallax effect on scroll.

B. The Services Grid (Visual Menu)

    Layout: A 2-row x 3-column grid (Desktop) / Stacked (Mobile).

    Content: Create 6 cards for specific services:

        Royal Mandap

        Stage Decor

        Luxury Car Decor

        Bridal Suite / Bedroom

        Grand Entrance

        Haldi & Mehndi

    Card Design: Square aspect ratio. Full-cover image background. Add a permanent gradient overlay at the bottom so white text is readable. On hover, the image scales up (scale-105) and a "View Details" gold link appears.

C. The "Masterpieces" Portfolio (Masonry)

    Layout: Masonry grid handling mixed aspect ratios (Portrait/Landscape).

    Features:

        Filter Bar: Centered at the top (All | Weddings | Corporate).

        Cards: High-quality floral images. On hover, show a dark overlay with the Event Name and Venue.

    Motion: Animate the grid items shuffling when filters are clicked (use autoAnimate or GSAP).

D. The "Social Proof" (Testimonials)

    Content: 3 Cards with Gujarati names (e.g., "Riya Patel from Visnagar").

    Design: Clean white cards with a gold border (border-brand-gold/30), large quote icon, and 5 gold stars.

E. The Contact Section (Lead Gen)

    Layout: Split screen. Left side: Emotional copy ("Let's Create Magic"). Right side: The Form.

    Form Design: "Luxury Letterhead" style. Inputs should have transparent backgrounds and gold underlines (no boxy borders).

    Fields: Name, Phone, Date, Venue.

    CTA Button: Full width, Gradient Gold background (from-[#D4AF37] to-[#AA8C2C]), text in Black (Bold).

3. Global Elements

    Navigation: Fixed, transparent navbar at the top. Blurs on scroll. Links: Home, Portfolio, Services, Contact.

    Footer:

        Background: Deep Maroon (#800000).

        Content: Address (Mehsana, Gujarat 384001), Phone (+91 74016 25072), WhatsApp, Instagram, and Facebook links.

4. Technical Requirements

    Responsive: Mobile-first approach. Ensure touch targets are large enough (44px+).

    Animation: Use GSAP from() to stagger-fade elements in as they scroll into view.

    Code Structure: Clean, modular Svelte components. Use Tailwind v4 syntax.
