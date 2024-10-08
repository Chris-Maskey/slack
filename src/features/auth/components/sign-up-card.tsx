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
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Full Name is required",
      })
      .min(5, {
        message: "Full Name must be of atleast 5 characters long",
      }),
    email: z.string().email().min(1, {
      message: "Email is required",
    }),
    password: z
      .string()
      .min(1, {
        message: "Password is required",
      })
      .min(6, {
        message: "Password must be of atleast 6 characters",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password do not match",
    path: ["confirmPassword"],
  });

type SignUpSchemaType = z.infer<typeof signUpSchema>;

type SignUpCardProps = {
  setState: (state: SignInFlow) => void;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const [isPending, setIsPending] = useState<boolean>(false);

  const onProviderSignIn = (value: "github" | "google") => {
    setIsPending(true);
    signIn(value).finally(() => setIsPending(false));
  };

  const onPasswordSignUp = ({ name, email, password }: SignUpSchemaType) => {
    signIn("password", { name, email, password, flow: "signUp" }).catch(() => {
      setError("root", {
        type: "custom",
        message: "Invalid Email or Password",
      });
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
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
        <form className="space-y-2.5" onSubmit={handleSubmit(onPasswordSignUp)}>
          {/*Full Name*/}
          <div className="space-y-1">
            <Input
              {...register("name")}
              disabled={isSubmitting || isPending}
              placeholder="Full Name"
              type="text"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
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

          {/*Confirm Password Input*/}
          <div className="space-y-1">
            <Input
              {...register("confirmPassword")}
              disabled={isSubmitting || isPending}
              placeholder="Confirm Password"
              type="password"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
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
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
