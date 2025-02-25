"use client"
import NavBar from "@/app/components/NavBar"
import type { IUser } from "@/app/interfaces/user.interface"
import { myProfile, updateAvatar, updatePassword, updateUsername } from "@/app/lib/getData"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Pencil, UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function ProfilePage() {
    const [user, setUser] = useState<IUser | null>(null)
    const [showNameFields, setShowNameFields] = useState(false)
    const [showPasswordFields, setShowPasswordFields] = useState(false)
    const [newUserName, setNewUserName] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPasswords, setShowPasswords] = useState({

        current: false,
        new: false,
        confirm: false,
    })
    const [avatarUrl, setAvatarUrl] = useState('');
    const router = useRouter();

    const fetchUserProfile = async () => {
        const token = localStorage.getItem("accessToken")

        if (!token) return router.push("/login")

        try {
            const userData = await myProfile()
            setUser(userData.data)
            setAvatarUrl(userData?.data?.avatar ? `https://titan-blog.s3.amazonaws.com/${userData?.data?.avatar}` : "/avatar.png")
        } catch (error) {
            // localStorage.removeItem("accessToken")
            console.error("Lỗi khi lấy thông tin người dùng:", error)
        }
    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const handleUpdate = async () => {
        const token = localStorage.getItem("accessToken")

        if (!token) return

        try {
            if (newUserName) {
                await updateUsername(newUserName)
            }

            if (newPassword && confirmPassword && checkPassword(newPassword, confirmPassword)) {
                await updatePassword(oldPassword, newPassword, confirmPassword)
            }
            window.location.reload()
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error.response.data)
        }
    }

    const checkPassword = (newPassword: string, confirmPassword: string) => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match")
            return false
        }
        return true
    }

    const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChangeAvatar = () => {

        fileInputRef.current?.click()
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const allowedTypes = ["image/png", "image/jpeg"];

        if (!allowedTypes.includes(file.type)) {
            alert("Chỉ cho phép file PNG hoặc JPG!");
            return;
        }


        const maxSizeInBytes = 5 * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
            alert("File phải có kích thước nhỏ hơn 5MB!");
            return;
        }

        const objectUrl = URL.createObjectURL(file)
        setAvatarUrl(objectUrl)

        try {
            await updateAvatar(file);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NavBar />
            <main className="container mx-auto py-10 px-4">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">My Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex flex-col items-center gap-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src={avatarUrl}
                                        alt="Profile picture"
                                    />
                                    <AvatarFallback>
                                        <UserCircle className="h-12 w-12" />
                                    </AvatarFallback>
                                </Avatar>
                                <Button type="button" variant="outline" size="sm" onClick={handleChangeAvatar}>
                                    Change Photo
                                </Button>
                                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                            </div>

                            <div className="space-y-6">
                                {/* Name Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium">Name</h3>
                                            <p className="text-sm text-muted-foreground">{user?.username}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="text-primary p-0 h-auto font-normal"
                                            onClick={() => setShowNameFields(!showNameFields)}
                                        >
                                            <span className="flex items-center gap-2">
                                                Change name
                                                <Pencil className="h-4 w-4" />
                                            </span>
                                        </Button>
                                    </div>

                                    {showNameFields && (
                                        <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                                            <div className="grid gap-2">
                                                <Label htmlFor="firstName">Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="Enter name"
                                                    onChange={(e) => setNewUserName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Email Section */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                                </div>

                                {/* Password Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium">Password</h3>
                                            <p className="text-sm text-muted-foreground">••••••••</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="text-primary p-0 h-auto font-normal"
                                            onClick={() => setShowPasswordFields(!showPasswordFields)}
                                        >
                                            <span className="flex items-center gap-2">
                                                Change password
                                                <Pencil className="h-4 w-4" />
                                            </span>
                                        </Button>
                                    </div>

                                    {showPasswordFields && (
                                        <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                                            <div className="grid gap-2">
                                                <Label htmlFor="currentPassword">Current Password</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="currentPassword"
                                                        name="currentPassword"
                                                        type={showPasswords.current ? "text" : "password"}
                                                        placeholder="Enter current password"
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                        onClick={() => togglePasswordVisibility("current")}
                                                    >
                                                        {showPasswords.current ? (
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                        <span className="sr-only">{showPasswords.current ? "Hide password" : "Show password"}</span>
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="newPassword">New Password</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="newPassword"
                                                        name="newPassword"
                                                        type={showPasswords.new ? "text" : "password"}
                                                        placeholder="Enter new password"
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                        onClick={() => togglePasswordVisibility("new")}
                                                    >
                                                        {showPasswords.new ? (
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                        <span className="sr-only">{showPasswords.new ? "Hide password" : "Show password"}</span>
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type={showPasswords.confirm ? "text" : "password"}
                                                        placeholder="Confirm new password"
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                        onClick={() => togglePasswordVisibility("confirm")}
                                                    >
                                                        {showPasswords.confirm ? (
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                        <span className="sr-only">{showPasswords.confirm ? "Hide password" : "Show password"}</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Button
                                        type="reset"
                                        variant="outline"
                                        onClick={() => {
                                            setShowNameFields(false)
                                            setShowPasswordFields(false)
                                            setNewUserName("")
                                            setOldPassword("")
                                            setNewPassword("")
                                            setConfirmPassword("")
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="button" onClick={handleUpdate}>
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}

