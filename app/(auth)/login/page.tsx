"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginFormFields } from "@/schemas";
import { signIn, SignInResponse } from "next-auth/react";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status} = useSession();

  const hasShownToast = useRef(false); // to prevent multiple toasts

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (formData) => {
    const result : SignInResponse | undefined = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false
    });
    
    if (result?.error) {
      toast.error("Please check your credentials and try again.");
      return;
    }

    router.push("/");
    toast.success("Login successful");
  };

  useEffect(() => {
    if (session) {
      toast.info("You are already logged in.");
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    const errorMessage = searchParams.get("auth");
    if (errorMessage && !hasShownToast.current) {
      toast.error("Please login to continue");
      hasShownToast.current = true;
    }
  }, [searchParams]);

  return (
    <section>
      <div className="flex justify-center h-screen">
        <div className="flex-1 relative hidden md:block p-0 bg-[url(/assets/images/auth2.jpeg)] bg-cover">
        </div>
        <div className="flex items-center flex-1">
          <div className="flex flex-col gap-5 w-4/5 max-w-96 mx-auto">
            <div className="">
              <h5 className="font-bold text-3xl md:text-4xl">Welcome👋</h5>
              <p className="text-gray-400">Please login here</p>
            </div>
            <form
              className="flex flex-col space-y-5"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label>
                <span className="form_label">
                  Email Address <span className="text-red-900">*</span>
                </span>
                <Input type="email" {...register("email")} />
                {errors.email && (
                  <span className="error_span">{errors.email.message}</span>
                )}
              </label>
              <label>
                <span className="form_label">
                  Password <span className="text-red-900">*</span>
                </span>
                <Input type="password" {...register("password")} />
                {errors.password && (
                  <span className="error_span">{errors.password.message}</span>
                )}
              </label>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Login"}
              </Button>
            </form>
            <p className="">
              Don&rsquo;t have an account?{" "}
              <Link href="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
