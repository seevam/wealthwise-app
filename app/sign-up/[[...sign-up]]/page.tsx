import { SignUp } from '@clerk/nextjs'


export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-green-600 hover:bg-green-700',
            card: 'shadow-2xl'
          }
        }}
      />
    </div>
  )
}



