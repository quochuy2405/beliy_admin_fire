"use client"
import { Login } from '@/components/templates';
import { loginSchema } from '@/utils/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";

const LoginPage = () => {
    const router = useRouter()
    const methods = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(loginSchema)
    })

    const handleSubmit = (data) => {
        router.push('/admin')
    }
    const props = {
        methods, handleSubmit
    }
    return (
        <Login {...props} />
    )
}

export default LoginPage