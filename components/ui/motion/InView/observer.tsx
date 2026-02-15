type InViewCallback = (el: Element) => void;

type Config = {
  once?: boolean;
  callbacks: {
    onEnter: InViewCallback;
    onLeave?: InViewCallback;
  };
};

const elements = new Map<Element, Config>();

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    // only create observer on client
    if (typeof window === 'undefined') return null;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { target, isIntersecting } = entry;
          const config = elements.get(target);
          if (!config) return;

          // Entering viewport
          if (isIntersecting) {
            config.callbacks.onEnter(target as HTMLElement);
          }
          // Leaving viewport
          else if (config.callbacks.onLeave) {
            config.callbacks.onLeave(target as HTMLElement);
          }

          // Stop observing if `once` is true
          if (config.once && isIntersecting) {
            observer?.unobserve(target);
            elements.delete(target);
          }
        });
      },
      { threshold: 0.2 },
    );
  }

  return observer;
}

export function register(el: Element, config: Config) {
  elements.set(el, config);
  const obs = getObserver();
  if (obs) obs.observe(el);
}

export function unregister(el: Element) {
  elements.delete(el);
  observer?.unobserve(el);
}
