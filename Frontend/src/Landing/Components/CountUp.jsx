import { useEffect, useRef, useState } from 'react';

const CountUp = ({
  end = 0,
  duration = 1600,
  suffix = '',
  prefix = '',
  start = 0,
  decimals = 0,
  trigger = false,
}) => {
  const [value, setValue] = useState(start);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = start + (end - start) * progress;

      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [trigger, start, end, duration]);

  return (
    <>
      {prefix}
      {Number(value).toFixed(decimals)}
      {suffix}
    </>
  );
};

export default CountUp;
