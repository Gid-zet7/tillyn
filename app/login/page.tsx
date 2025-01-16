import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center gap-6 p-4">
      <h1>Tillyn</h1>
      <button>
        <RegisterLink>Sign up</RegisterLink>
      </button>
      <button>
        <LoginLink>Sign In</LoginLink>
      </button>

      <button>
        <LogoutLink>Logout</LogoutLink>
      </button>
    </main>
  );
}
