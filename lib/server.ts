import { headers } from 'next/headers';

export async function getLocation() {
  const headersList = await headers();
  const requestUrl = new URL(headersList.get('x-request-url')!);

  return requestUrl;
}
