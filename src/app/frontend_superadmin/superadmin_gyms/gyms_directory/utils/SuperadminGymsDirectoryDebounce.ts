/** Delays a string search update; cancel prevents updates after unmount. */
export function debounce(callback: (value: string) => void, delayMs: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cancel = () => { if (timer !== undefined) clearTimeout(timer); timer = undefined; };
  const run = (value: string) => { cancel(); timer = setTimeout(() => { timer = undefined; callback(value); }, delayMs); };
  run.cancel = cancel;
  return run;
}
