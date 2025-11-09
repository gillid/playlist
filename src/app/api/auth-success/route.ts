import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  const cookieStore = await cookies();

  const cookieValue = cookieStore.get('_pl_share_redirect')?.value;

  if (cookieValue) {
    cookieStore.delete('_pl_share_redirect');
    redirect(cookieValue);
  }

  redirect('/');
}
