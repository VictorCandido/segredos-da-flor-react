import { useRouter } from "next/router";
import { useEffect } from "react"

export default function Custom404() {
    const router = useRouter();

    // Auto redirect to Home page
    useEffect(() => {
        router.push('/');
    }, [router]);

    return <></>
}