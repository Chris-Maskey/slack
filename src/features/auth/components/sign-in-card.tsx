import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignInFlow } from "../types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";

import { useAuthActions } from "@convex-dev/auth/react";

const signInSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

type SignInCardProps = {
  setState: (state: SignInFlow) => void;
};

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const [isPending, setIsPending] = useState<boolean>(false);

  const onProviderSignIn = (value: "github" | "google") => {
    setIsPending(true);
    signIn(value).finally(() => {
      setIsPending(false);
    });
  };

  const onPasswordSignIn = ({ email, password }: SignInSchemaType) => {
    signIn("password", { email, password, flow: "signIn" }).catch(() => {
      setError("root", {
        type: "custom",
        message: "Invalid Email or Password",
      });
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {errors.root && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          {errors.root.message}
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSubmit(onPasswordSignIn)}>
          {/*Email Input*/}
          <div className="space-y-1">
            <Input
              {...register("email")}
              disabled={isSubmitting || isPending}
              placeholder="Email"
              type="email"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/*Password Input*/}
          <div className="space-y-1">
            <Input
              {...register("password")}
              disabled={isSubmitting || isPending}
              placeholder="Password"
              type="password"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button
            className="w-full"
            size={"lg"}
            disabled={isSubmitting || isPending}
            type="submit"
          >
            Continue
          </Button>
        </form>
        <Separator />

        {/*Service Sign-Ins*/}
        <div className="flex flex-col space-y-2.5">
          <Button
            disabled={isSubmitting || isPending}
            onClick={() => {
              onProviderSignIn("google");
            }}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={isSubmitting || isPending}
            onClick={() => {
              onProviderSignIn("github");
            }}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with GitHub
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
