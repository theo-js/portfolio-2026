/**
 * Returns the height of the browser's toolbar
 * (the area occupied by the URL bar and other browser UI elements) in pixels.
 */
export function checkToolbarHeight(): number {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;height:100dvh;top:0;visibility:hidden';
  document.body.appendChild(el);
  const dvhInPx = el.offsetHeight;
  document.body.removeChild(el);

  const toolbarHeight = dvhInPx - window.innerHeight;
  return toolbarHeight;
}
