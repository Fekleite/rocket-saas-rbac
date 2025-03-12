import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

import { GithubIcon } from '@/components/icons/github-icon';

import { signInWithEmailAndPassword } from './actions';

export default function SignIn() {
  return (
    <form action={signInWithEmailAndPassword} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot your password
        </Link>
      </div>

      <Button className="w-full" type="submit">
        Sign in with e-mail
      </Button>

      <Button className="w-full" type="submit" variant="link" asChild>
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />

      <Button className="w-full" variant="outline" type="submit">
        <GithubIcon className="mr-2 h-4 w-4 dark:invert" />
        Sign in with Github
      </Button>
    </form>
  );
}
