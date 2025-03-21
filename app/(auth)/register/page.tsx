"use client";

import axios from "axios";
import Link from "next/link";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterSchema, RegisterFormFields } from "@/schemas";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const router = useRouter();
  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (formData) => {
    console.log("On submit");
    try {
      const response = await axios.post("/api/register", formData);
      console.log(response);
      if (response.status === 201) {
        toast.success("Account created successfully. Please login");

        router.push("/login");
      }
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
      if (status === "authenticated") {
        toast.info("You are already logged in.");
        router.replace("/");
      }
    }, [status, router]);

  return (
    <section>
      <div className="flex justify-center h-screen">
      <div className="flex-1 relative hidden md:block p-0 bg-[url(/assets/images/auth2.jpeg)] bg-cover">
      </div>
        <div className="flex items-center flex-1">
          <div className="flex flex-col gap-5 w-4/5 max-w-96 mx-auto">
            <div className="mb-6">
              <h5 className="font-bold text-3xl md:text-4xl">Create Account</h5>
              <p className="text-gray-400">Please enter details</p>
            </div>
            <form className="flex flex-col space-y-5" method="post" onSubmit={handleSubmit(onSubmit)}>
              <label>
                <span className="text-gray-700 text-sm font-medium">
                  Full Name <span className="text-red-900">*</span>
                </span>
                <Input {...register("name")} />
                {errors.name && (
                  <span className="error_span">{errors.name.message}</span>
                )}
              </label>
              <label>
                <span className="text-gray-700 text-sm font-medium">
                  Email Address <span className="text-red-900">*</span>
                </span>
                <Input type="email" {...register("email")} />
                {errors.email && (
                  <span className="error_span">{errors.email.message}</span>
                )}
              </label>
              <label>
                <span className="text-gray-700 text-sm font-medium">
                  Password <span className="text-red-900">*</span>
                </span>
                <Input type="password" {...register("password")} />
                {errors.password && (
                  <span className="error_span">{errors.password.message}</span>
                )}
              </label>
              <label>
                <span className="text-gray-700 text-sm font-medium">
                  Confirm Password <span className="text-red-900">*</span>
                </span>
                <Input type="password" {...register("confirmPassword")} />
                {errors.confirmPassword && (
                  <span className="error_span">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading..." : "Sign Up"}
              </Button>
            </form>
            <p className="">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
