import { sideBarStore } from '@/store'
import { Link } from 'react-router-dom'

interface Props {
    path: {
        pathname: string
    }
    to: string
    textContent: string
    additional?: string
}

export default function NavigationLink({ path, to, textContent, additional }: Props) {
    const { openSidebarFn } = sideBarStore();

    const clickFunction = () => {
        window.scrollTo(0, 0)

        if (additional === "sideNav") {
            openSidebarFn();
        }
    }

    return (
        <Link to={to} onClick={() => clickFunction()} className={`
        ${path.pathname === to
                ? "text-wise-primary border-b-2 border-wise-primary py-1 text-lg font-bold"
                : "hover:text-gray-600 py-1 text-lg font-semibold"
            }
        transition-colors duration-300
    `}>
            {textContent}
        </Link>
    )
}
