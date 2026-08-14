import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {

const searchParams = useSearchParams();

// Get the page the user originally wanted to visit.
const redirectTo = searchParams.get("redirectTo") || "/my-bookings";


  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

     // Send the user back to the page they originally requested.
    router.push(redirectTo); 
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <LoginForm />
    </main>
  );
}
