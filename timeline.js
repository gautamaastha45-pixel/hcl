document.addEventListener('DOMContentLoaded', () => {
  const timelineContainer = document.getElementById('timeline-4step');
  const lineProgress = document.getElementById('t-line-progress');
  const steps = document.querySelectorAll('.t-step');
  if (!timelineContainer || !lineProgress || steps.length === 0) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate the line
        // The line should span across to the last dot. Since there are 4 steps,
        // the last dot is at ~87.5% across the container in a 4-column grid, but
        // calc(100% - 20px) is standard for full width minus padding.
        lineProgress.style.width = 'calc(100% - 20px)';
        // Stagger the steps popping in
        steps.forEach((step, index) => {
          setTimeout(() => {
            step.classList.add('is-visible');
          }, 300 + (index * 400)); // Delay first step slightly, then 400ms stagger
        });
        // Unobserve after animating once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% of timeline is visible
  });
  observer.observe(timelineContainer);
});
