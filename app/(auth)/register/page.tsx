"use client";

import axios from "axios";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ValidatedRegisterSchema, ValidatedRegisterFields } from "@/schemas";
import { motion } from "motion/react"
import { toast } from "sonner";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Register() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);  

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ValidatedRegisterFields>({
    resolver: zodResolver(ValidatedRegisterSchema),
    defaultValues: {
      language: "",
    },
  });

  const handleNext = async () => {
    console.log("handle next");

    const isStep1Valid = await trigger(["name", "email", "password", "confirmPassword"]);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const finalSubmit: SubmitHandler<ValidatedRegisterFields> = async (formData) => {
    console.log("final submit", formData);

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
  }

  return (
    <section>
      <div className="flex justify-center h-screen">
      <div className="flex-1 relative hidden md:block p-0 bg-[url(/assets/images/auth.jpeg)] bg-cover">
      </div>
        <div className="flex items-center flex-1">
          <div className="flex flex-col gap-5 w-4/5 max-w-96 mx-auto">
            <div className="mb-6">
              <h5 className="font-bold text-3xl md:text-4xl">Create Account</h5>
              <p className="text-gray-400">Please enter details</p>
            </div>
            <form className="flex flex-col space-y-5" method="post" onSubmit={handleSubmit(finalSubmit)}>

              { step === 1 && (
                <div className="flex flex-col space-y-5">
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

                  <Button type="button" className="cursor-pointer" onClick={handleNext}>
                    Continue
                    <ArrowRight />
                  </Button>
                </div>
              ) }
              
              { step === 2  && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col space-y-5"
                >
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Language preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Language</SelectLabel>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="yo">Yoruba</SelectItem>
                            <SelectItem value="ig">Igbo</SelectItem>
                            <SelectItem value="ha">Hausa</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.language && (
                    <span className="error_span">{errors.language.message}</span>
                  )}

                  <Button disabled={isSubmitting} type="submit" className="cursor-pointer">
                    {isSubmitting ? "Loading..." : "Sign Up"}
                  </Button>
                  <Button onClick={() => setStep(1)} variant="outline" className="cursor-pointer">
                    Go Back
                  </Button>
                </motion.div>
              )}
              
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
