export function removeFirstSegment(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  return '/' + segments.slice(1).join('/');
}
