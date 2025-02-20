"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { login } from "../lib/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/app/components/Modal";
import { useRouter } from "next/navigation";


export default function Login() {
    const [error, setError] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            router.replace("/");
        }

    }, [isLogin, router]);

    const onSubmit = async () => {
        try {
            const data = await login(email, password);

            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("titanToken", data.data.titanToken);
            setIsLogin(true);
            router.replace("/");
        } catch (error) {
            setError("Tài khoảng mật khẩu, không đúng");
            setIsModalOpen(true);
        }

    };

    const validatePassword = (password: string) => {
        if (password.length < 6) {
            return setErrorPassword("Mật khẩu phải có ít nhất 6 ký tự");
        }
        if (!/[A-Z]/.test(password)) {
            return setErrorPassword("Mật khẩu phải chứa ít nhất một chữ in hoa");
        }
        if (!/\d/.test(password)) {
            return setErrorPassword("Mật khẩu phải chứa ít nhất một chữ số");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return setErrorPassword("Mật khẩu phải chứa ít nhất một ký tự đặc biệt");
        }
        setErrorPassword("");
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setErrorEmail("Email không hợp lệ");
        }
        setErrorEmail("");
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="w-1/3 bg-gray-100 p-10 rounded-xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        alt="Your Company"
                        src="/logo.gif"
                        className="mx-auto h-20 w-auto rounded-full"
                        width={80}
                        height={80}
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* Đã sửa lỗi onSubmit */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateEmail(e.target.value);
                                    }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                            <p className="text-red-500 text-sm">{errorEmail ? errorEmail : ""}</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2 relative">
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        validatePassword(e.target.value);
                                    }}
                                    id="password"
                                    name="password"
                                    type={isShowPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                />
                                <div onClick={() => setIsShowPassword(!isShowPassword)} className="absolute right-0 top-0 h-full px-3 py-2 items-center flex hover:bg-transparent">
                                    <FontAwesomeIcon icon={isShowPassword ? faEye : faEyeSlash} className="text-gray-500 h-5 w-5" />
                                </div>

                            </div>
                            <p className="text-red-500 text-sm">{errorPassword ? errorPassword : ""}</p>
                        </div>

                        <div>
                            <button
                                onClick={onSubmit}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thông báo">
                        <p className="text-red-500 text-sm">{error}</p>
                    </Modal>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
