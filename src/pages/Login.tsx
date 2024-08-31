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

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [loginFn] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    await loginFn(data)
      .unwrap()
      .then((res) => {
        if (res?.statusCode === 200) {
          const user = {
            userId: res?.data?._id,
            name: res?.data?.name,
            role: res?.data?.role,
            email: res?.data?.email,
            image: res?.data?.image,
          };
          const token = res?.token;

          dispatch(setUser({ user, token }));
          navigate(state ? state : "/");
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
    <section className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="mail@example.com"
                required
              />
            </div>
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm font-medium underline underline-offset-4 hover:text-primary"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="****************"
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[40%] opacity-50 cursor-pointer"
              >
                {showPassword ? <LucideEye /> : <LucideEyeOff />}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              type="submit"
              className="w-full border-theme/40"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader size={28} /> : "Login"}
            </Button>
          </CardFooter>
          <Link
            to="/register"
            className="inline-block w-full text-center text-sm  font-medium underline underline-offset-4 hover:text-primary pb-8"
          >
            Haven't account yet ? Sign Up
          </Link>
        </Card>
      </form>
    </section>
  );
}

export default Login;
