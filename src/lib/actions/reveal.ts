/**
 * Fade-and-lift an element the first time it scrolls into view.
 *
 * Stands in for the spec's Framer Motion `useInView({ once: true })`. An
 * IntersectionObserver does the same job in a few lines, so the animation
 * library is not worth pulling in.
 *
 * Pair with the `.reveal` class in theme.css, which holds the start state.
 */
export function reveal(node: HTMLElement, delayMs = 0) {
	node.classList.add('reveal');
	node.style.transitionDelay = `${delayMs}ms`;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.classList.add('is-visible');
			observer.disconnect();
		},
		{ rootMargin: '0px 0px -10% 0px' }
	);
	observer.observe(node);

	return {
		destroy: () => observer.disconnect()
	};
}
