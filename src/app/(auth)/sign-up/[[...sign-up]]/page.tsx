import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <SignUp />
            </div>
        </div>
    );
}