import { getCookie } from '@/utils/client';

export default function () {
  return getCookie('session');
}
