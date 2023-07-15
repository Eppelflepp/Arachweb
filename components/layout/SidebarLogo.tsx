import { useRouter } from "next/router";
import { GiCobweb } from 'react-icons/gi'

const SidebarLogo = () => {
    const router = useRouter();

    return (
        <div onClick={() => router.push('/')}
            className="
            rounded-full
            h-14
            w-14
            t-4
            flex
            items-center
            justify-center
            hover:bg-blue-400
            cursor-pointer
            transition
            ">
            <GiCobweb size={28} color="white"/>
        </div>
    );
}

export default SidebarLogo;