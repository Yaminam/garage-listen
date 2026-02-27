// Animation utilities and keyframes for UI polish

export const animations = {
  fadeIn: {
    name: 'fadeIn',
    duration: '300ms',
    timingFunction: 'ease-in-out',
  },
  slideInUp: {
    name: 'slideInUp',
    duration: '300ms',
    timingFunction: 'ease-out',
  },
  slideInDown: {
    name: 'slideInDown',
    duration: '300ms',
    timingFunction: 'ease-out',
  },
  scaleIn: {
    name: 'scaleIn',
    duration: '200ms',
    timingFunction: 'ease-out',
  },
  pulse: {
    name: 'pulse',
    duration: '2s',
    timingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    iterationCount: 'infinite',
  },
  bounce: {
    name: 'bounce',
    duration: '1s',
    timingFunction: 'infinite',
  },
  shimmer: {
    name: 'shimmer',
    duration: '2s',
    timingFunction: 'infinite',
  },
};

export const transitionClasses = {
  fast: 'transition-all duration-150 ease-in-out',
  normal: 'transition-all duration-300 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
  smooth: 'transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)',
};

export const animationClasses = {
  fadeIn: 'animate-fade-in',
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  scaleIn: 'animate-scale-in',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  shimmer: 'animate-shimmer',
};

// Tailwind config keyframes
export const tailwindKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes shimmer {
    0%, 100% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
