import Container from "@/components/shared/Container";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { jsonToFormData } from "@/utils/formDataBuilder";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const user = useAppSelector(currentUser);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const [registerFn] = useRegisterMutation();

  const onsubmit = async (data: FieldValues) => {
    const { files, ...remainData } = data;

    const newUserData: Record<string, unknown> = {
      image: files[0],
      ...remainData,
    };

    if (user?.role == "admin") {
      newUserData.role = "admin";
    }

    const userFormData = jsonToFormData(newUserData);

    await registerFn(userFormData)
      .unwrap()
      .then((res) => {
        if (res?.statusCode === 201) {
          reset();
          navigate("/login");
          toast({
            title: res?.message,
            duration: 2000,
          });
        }
      })
      .catch((error) => {
        toast({
          title: error?.data?.message,
          duration: 2000,
        });
      });
  };

  return (
    <Container>
      <section className="flex justify-center items-center min-h-screen py-8">
        <form onSubmit={handleSubmit(onsubmit)}>
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">
                {user?.role === "admin" ? "Add Admin" : "Create an account"}
              </CardTitle>
              <CardDescription>
                Enter your details below to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <span className="text-theme text-xs">
                    {errors.name.message as string}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <span className="text-theme text-xs">
                    {errors.email.message as string}
                  </span>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="***********"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[45%] opacity-50 cursor-pointer"
                >
                  {showPassword ? <LucideEye /> : <LucideEyeOff />}
                </div>
                {errors.password && (
                  <span className="text-theme text-xs">
                    {errors.password.message as string}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-image">Profile Image</Label>
                <Input
                  {...register("files", { required: "Photo is required" })}
                  id="profile-image"
                  type="file"
                  className="dark:file:text-white"
                />

                {errors.files && (
                  <span className="text-theme text-xs">
                    {errors.files.message as string}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              {user?.role !== "admin" && (
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Have an account? Login
                </Link>
              )}
              <Button type="submit" variant="outline">
                {isSubmitting ? <Loader size={28} /> : "Register"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </section>
    </Container>
  );
}

export default Register;
