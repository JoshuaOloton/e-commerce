import Link from "next/link"
import { Button } from "@/components/ui/button"

const page = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center p-[10%] gap-3">
      <h1 className="text-2xl font-bold">403 - Access Denied</h1>
      <p className="text-lg">You do not have permission to view this page</p>
      <Button className="mt-4">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  )
}

export default page