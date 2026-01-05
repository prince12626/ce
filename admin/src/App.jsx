import { useClerk } from "@clerk/clerk-react";

function AuthButtons() {
        const { openSignIn, openSignUp } = useClerk();

        return (
                <div>
                        <button onClick={() => openSignIn({})}>
                                Sign In (Popup)
                        </button>
                        <button onClick={() => openSignUp({})}>
                                Sign Up (Popup)
                        </button>
                </div>
        );
}

export default AuthButtons;