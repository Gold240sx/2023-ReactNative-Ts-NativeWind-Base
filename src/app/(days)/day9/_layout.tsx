import { Slot, router } from "expo-router"
import { getCurrentUser, type AuthUser } from "aws-amplify/auth"
import { useEffect, useState } from "react"

export default function Day9Layout() {
	const [user, setUser] = useState<AuthUser>()

	const fetchUser = async () => {
		const res = await getCurrentUser()
		setUser(res)
	}

	useEffect(() => {
		fetchUser()
	}, [])
	console.log(user)

	return <Slot />
}
