import * as React from "react";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { useState, useContext } from "react";
import { loginUser, registerUser } from "../api/tasks.api";
import { TaskContext } from "../util/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const customTheme = extendTheme({ colorSchemes: { light: {} } });

export default function Auth() {
    const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
    const [isLogin, setIsLogin] = useState(true);
    const { setToken, setID, setUsername, setIsAuth } = useContext(TaskContext);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Check if passwords match
        if (!isLogin && formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match", {
                position: "bottom-left",
                className: "custom-toast",
                style: {
                    backgroundColor: "#202020",
                    color: "#ffffff",
                },
            });
            return;
        }

        const data = isLogin
            ? await loginUser(formData)
            : await registerUser(formData);
        if (data) {
            setID(data.user.id);
            setToken(data.token);
            setUsername(data.user.username);
            setIsAuth(true);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("id", data.user.id);
            sessionStorage.setItem("username", data.user.username);
            sessionStorage.setItem("isAuth", "true");
            navigate("/");
        } else {
            toast.error("Invalid account", {
                position: "bottom-left",
                className: "custom-toast",
                style: {
                    backgroundColor: "#202020",
                    color: "#ffffff",
                },
            });
        }
    };

    return (
        <CssVarsProvider theme={customTheme} disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ":root": {
                        "--Form-maxWidth": "800px",
                        "--Transition-duration": "0.4s",
                    },
                }}
            />
            <Box
                sx={{
                    width: { xs: "100%", md: "50vw" },
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    backdropFilter: "blur(12px)",
                    backgroundColor: isLogin
                        ? "rgba(150 0 150 / 0.1)"
                        : "rgba(0 0 0 / 0.1)",
                    transition: "left 0.6s ease, background-color 0.6s ease",
                    left: isLogin
                        ? { xs: 0, md: "0" }
                        : { xs: 0, md: "50vw" },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100dvh",
                        width: "100%",
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                gap: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <Box
                                component="img"
                                src="/logoPaws.svg"
                                alt="Logo"
                                sx={{ width: 650, height: 80, mt: 5 }}
                            />
                        </Box>
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: "auto",
                            py: 2,
                            pb: 5,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: 400,
                            maxWidth: "100%",
                            mx: "auto",
                            mt: "0",
                            borderRadius: "sm",
                            "& form": {
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            },
                            [`& .MuiFormLabel-asterisk`]: {
                                visibility: "hidden",
                            },
                        }}
                    >
                        <Stack sx={{ gap: 4, mb: 2 }}>
                            <Stack sx={{ gap: 1 }}>
                                <Typography
                                    component="h1"
                                    level="h3"
                                    sx={{
                                        fontSize: "3rem",
                                        transition:
                                            "transform 0.4s ease-in-out",
                                    }}
                                >
                                    {isLogin ? "Sign In" : "Sign Up"}
                                </Typography>
                                <Typography level="body-md">
                                    {isLogin
                                        ? "New in task?"
                                        : "Already have an account?"}{" "}
                                    <Link
                                        level="title-lg"
                                        sx={{
                                            cursor: "pointer",
                                            color: "black",
                                            transition: "color 0.4s",
                                            "&:hover": {
                                                color: "gray",
                                            },
                                        }}
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        {isLogin ? "Sign up!" : "Sign in!"}
                                    </Link>
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack sx={{ gap: 4 }}>
                            <form onSubmit={handleSubmit}>
                                <FormControl required>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="Enter your username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                {!isLogin && (
                                    <FormControl required>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <Input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                )}
                                <Stack sx={{ gap: 4, mt: 0 }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        sx={{
                                            backgroundColor: "#e0a8a8",
                                            "&:hover": {
                                                backgroundColor: "#000",
                                            },
                                        }}
                                    >
                                        {isLogin ? "Sign in!" : "Sign up!"}
                                    </Button>
                                </Stack>
                                <FormLabel>
                                    Don’t forget your username and password
                                </FormLabel>
                            </form>
                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography
                            level="body-xs"
                            sx={{ textAlign: "center" }}
                        >
                            ©Simón Celoria {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    height: "100%",
                    position: "fixed",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: { xs: 0, md: "0vw" },
                    transition:
                        "background-image var(--Transition-duration), left var(--Transition-duration) !important",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    backgroundColor: "background.level1",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "url(/fondos/dog_and_cat.svg)",
                }}
            />
        </CssVarsProvider>
    );
}
