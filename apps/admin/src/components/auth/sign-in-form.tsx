'use client';

import * as React from 'react';
import { useEffect } from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { authStateAtom, User, userAtom } from '@repo/store';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'info@indianspices.com', password: 'HacksRK2003@' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const { toast } = useToast();
  const router = useRouter();
  const [userState, setUserState] = useRecoilState(userAtom);
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: zod.infer<typeof schema>) => {
      return await login(data);
    },
    onSuccess: (data) => {
      const user: User = data?.user;
      console.log('Login successfully ', data);
      toast({
        description: 'Login successfully.',
      });
      console.log(user);
      setUserState(user);
      setAuthState({
        isLoggedIn: true,
        user: user || null,
      });
      console.log('auth user reached', {
        isLoggedIn: true,
        user: user || null,
      });
      localStorage.setItem(
        'authUser',
        JSON.stringify({
          isLoggedIn: true,
          user: user || null,
        })
      );
      router.replace(paths.dashboard.overview);
    },
    onError: (error) => {
      console.log('error ', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const submitHandler = (data: zod.infer<typeof schema>) => {
    mutate(data);
  };

  useEffect(() => {}, []);

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign in
          </Button>
        </Stack>
      </form>
      {/*<Alert color="warning">*/}
      {/*  Use{' '}*/}
      {/*  <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">*/}
      {/*    sofia@devias.io*/}
      {/*  </Typography>{' '}*/}
      {/*  with password{' '}*/}
      {/*  <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">*/}
      {/*    Secret1*/}
      {/*  </Typography>*/}
      {/*</Alert>*/}
    </Stack>
  );
}
