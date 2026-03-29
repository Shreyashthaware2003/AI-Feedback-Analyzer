"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<any>({});

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setForm({ name: "", email: "", password: "" });
        setErrors({});
        setShowPassword(false);
    };

    const validate = () => {
        let newErrors: any = {};

        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Min 6 characters required";
        }

        if (!isLogin && !form.name) {
            newErrors.name = "Name is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            setLoading(true);

            const url = isLogin
                ? "/api/auth/login"
                : "/api/auth/register";

            const payload = isLogin
                ? { email: form.email, password: form.password }
                : form;

            const res = await axios.post(url, payload);

            // ✅ store token
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            // ✅ store user
            if (res.data.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
            }

            if (isLogin) {
                toast.success("Login successful");

                // 🔥 go to dashboard
                router.push("/dashboard");

            } else {
                toast.success("Registered successfully");

                // 🔥 switch to login instead of redirect
                setIsLogin(true);

                // keep email, clear others
                setForm({
                    name: "",
                    email: form.email,
                    password: "",
                });
            }

        } catch (err: any) {
            const message =
                err.response?.data?.error || "Something went wrong";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeydown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black w-full">
            <div className="w-full max-w-md border rounded-2xl p-8 space-y-6 shadow-sm">

                <div>
                    <h1 className="text-2xl font-bold">
                        {isLogin ? "Login" : "Create Account"}
                    </h1>
                    <p className="text-xs text-gray-500">
                        AI Feedback Analyzer
                    </p>
                </div>

                {isLogin && (
                    <div className="text-xs bg-yellow-100 text-yellow-600 border-yellow-600 p-3 rounded-md border">
                        <p className="font-semibold">Demo Credentials:</p>
                        <p>Email: demo@gmail.com</p>
                        <p>Password: demo123</p>
                    </div>
                )}

                {!isLogin && (
                    <div className="space-y-1">
                        <Label className="text-xs">Name</Label>
                        <Input
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            onKeyDown={handleKeydown}
                            value={form.name}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs">{errors.name}</p>
                        )}
                    </div>
                )}

                <div className="space-y-1">
                    <Label className="text-xs">Email</Label>
                    <Input
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        onKeyDown={handleKeydown}
                        value={form.email.toLowerCase()}
                    // className="lowercase"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <Label className="text-xs">Password</Label>

                    <div className="relative">
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            onKeyDown={handleKeydown}
                            value={form.password}
                            className="pr-10"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeClosed className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-red-500 text-xs">{errors.password}</p>
                    )}
                </div>

                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-black text-white h-10 cursor-pointer"
                >
                    {loading
                        ? <Loader2 className="animate-spin w-4 h-4 mx-auto" />
                        : isLogin
                            ? "Login"
                            : "Register"}
                </Button>

                <p className="text-sm text-center">
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}
                    <span
                        onClick={handleToggle}
                        className="underline cursor-pointer"
                    >
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>

            </div>
        </div>
    );
}