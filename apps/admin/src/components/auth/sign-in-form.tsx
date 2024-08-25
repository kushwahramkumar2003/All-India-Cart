'use client';

import * as React from 'react';
import { useEffect } from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
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
import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { useToast } from '@/components/ui/use-toast';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues: Values = { email: '', password: '' };

function SignInForm(): React.JSX.Element {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const submitHandler = async (data: Values) => {
    try {
      const res = await signIn('credentials', {
        username: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError('root', { type: 'manual', message: res.error });
        toast({
          title: 'Sign in failed',
          description: res.error,
          // status: 'error',
        });
        return;
      }

      if (res?.ok) {
        toast({
          title: 'Sign in successful',
          // status: 'success',
        });
        router.push(paths.dashboard.overview);
      }
    } catch (error) {
      console.error('Sign-in error', error);
      setError('root', { type: 'manual', message: 'An unexpected error occurred' });
      toast({
        title: 'Sign in failed',
        description: 'An unexpected error occurred. Please try again.',
        // status: 'error',
      });
    }
  };

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
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
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
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
          {errors.root && <Alert color="error">{errors.root.message}</Alert>}
          <Button disabled={isSubmitting} type="submit" variant="contained">
            Sign in
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default SignInForm;
